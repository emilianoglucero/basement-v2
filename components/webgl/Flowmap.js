import React, { useRef, useState, useEffect } from "react";
import { PingPongPlane, Plane, useCurtainsEvent } from "react-curtains";
import {
  flowmapVs,
  flowmapFs,
  displacementVs,
  displacementFs,
} from "../../shaders/shaders";
import { Vec2 } from "curtainsjs";

function Flowmap({ children }) {
  const mouse = useRef(new Vec2());
  const lastMouse = useRef(new Vec2());
  const velocity = useRef(new Vec2());
  const updateVelocity = useRef(false);

  // mouse move
  useEffect(() => {
    const onMouseMove = (e) => {
      // velocity is our mouse position minus our mouse last position
      lastMouse.current.copy(mouse.current);

      // touch event
      if (e.targetTouches) {
        mouse.current.set(
          e.targetTouches[0].clientX,
          e.targetTouches[0].clientY
        );
      }
      // mouse event
      else {
        mouse.current.set(e.clientX, e.clientY);
      }

      // divided by a frame duration (roughly)
      velocity.current.set(
        (mouse.current.x - lastMouse.current.x) / 16,
        (mouse.current.y - lastMouse.current.y) / 16
      );

      // we should update the velocity
      updateVelocity.current = true;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onMouseMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onMouseMove, {
        passive: true,
      });
    };
  }, []);

  // FLOWMAP
  const [flowmap, setFlowmap] = useState();

  const setPingPongSizes = (plane) => {
    const planeBBox = plane.getBoundingRect();
    plane.uniforms.fallOff.value =
      planeBBox.width > planeBBox.height
        ? planeBBox.width / 30000
        : planeBBox.height / 20000;
    plane.uniforms.aspect.value = planeBBox.width / planeBBox.height;
  };

  const onPingPongReady = (plane) => {
    setFlowmap(plane);
    setPingPongSizes(plane);
  };

  useCurtainsEvent(
    "onRender",
    (curtains) => {
      if (flowmap) {
        // update mouse position
        flowmap.uniforms.mousePosition.value = flowmap.mouseToPlaneCoords(
          mouse.current
        );

        // update velocity
        if (!updateVelocity.current) {
          velocity.current.set(
            curtains.lerp(velocity.current.x, 0, 0.5),
            curtains.lerp(velocity.current.y, 0, 0.5)
          );
        }
        updateVelocity.current = false;

        flowmap.uniforms.velocity.value = new Vec2(
          curtains.lerp(velocity.current.x, 0, 0.1),
          curtains.lerp(velocity.current.y, 0, 0.1)
        );
      }
    },
    [flowmap]
  );

  const flowmapUniforms = {
    mousePosition: {
      name: "uMousePosition",
      type: "2f",
      value: new Vec2(),
    },
    // size of the cursor
    fallOff: {
      name: "uFalloff",
      type: "1f",
      value: 0,
    },
    // how much the cursor should grow with time
    cursorGrow: {
      name: "uCursorGrow",
      type: "1f",
      value: 1.15,
    },
    // alpha of the cursor
    alpha: {
      name: "uAlpha",
      type: "1f",
      value: 1,
    },
    // how much the cursor must dissipate over time (ie trail length)
    // closer to 1 = no dissipation
    dissipation: {
      name: "uDissipation",
      type: "1f",
      value: 0.925,
    },
    // our velocity
    velocity: {
      name: "uVelocity",
      type: "2f",
      value: new Vec2(),
    },
    // window aspect ratio to draw a circle
    aspect: {
      name: "uAspect",
      type: "1f",
      value: 0,
    },
  };

  // Render plane
  const [renderPlane, setRenderPlane] = useState();

  const onReady = (plane) => {
    setRenderPlane(plane);
  };

  // everything is ready
  useEffect(() => {
    if (flowmap && renderPlane) {
      // create a texture that will hold our flowmap
      renderPlane.createTexture({
        sampler: "uFlowTexture",
        fromTexture: flowmap.getTexture(), // set it based on our PingPongPlane flowmap plane's texture
      });
    }
  }, [flowmap, renderPlane]);

  return (
    <div className="Flowmap">
      <PingPongPlane
        className="Flowmap-ping-pong-plane"
        sampler="uFlowMap"
        // plane init parameters
        vertexShader={flowmapVs}
        fragmentShader={flowmapFs}
        uniforms={flowmapUniforms}
        texturesOptions={{ floatingPoint: "half-float" }}
        // plane events
        onReady={onPingPongReady}
        //onRender={onPingPongRender}
        onAfterResize={setPingPongSizes}
      />

      <Plane
        className="Flowmap-render-plane"
        // plane init parameters
        vertexShader={displacementVs}
        fragmentShader={displacementFs}
        // plane events
        onReady={onReady}
      >
        {children}
      </Plane>
    </div>
  );
}

export default Flowmap;
