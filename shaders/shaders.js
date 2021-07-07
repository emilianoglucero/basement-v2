export const flowmapVs = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif

    // default mandatory variables
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

    // custom variables
    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;

    void main() {

        vec3 vertexPosition = aVertexPosition;

        gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

        // varyings
        vTextureCoord = aTextureCoord;
        vVertexPosition = vertexPosition;
    }
`;

export const flowmapFs = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif

    varying vec3 vVertexPosition;
    varying vec2 vTextureCoord;

    uniform sampler2D uFlowMap;

    uniform vec2 uMousePosition;
    uniform float uFalloff;
    uniform float uAlpha;
    uniform float uDissipation;
    uniform float uCursorGrow;

    uniform vec2 uVelocity;
    uniform float uAspect;

    void main() {
        vec2 textCoords = vTextureCoord;
        
        
        /*** comment this whole block for a regular mouse flow effect ***/
        
        // convert to -1 -> 1
        textCoords = textCoords * 2.0 - 1.0;
        
        // make the cursor grow with time
        textCoords /= uCursorGrow;
        // adjust cursor position based on its growth
        textCoords += uCursorGrow * uMousePosition / (1.0 / (uCursorGrow - 1.0) * pow(uCursorGrow, 2.0));

        // convert back to 0 -> 1
        textCoords = (textCoords + 1.0) / 2.0;
        
        /*** end of whole block commenting for a regular mouse flow effect ***/


        vec4 color = texture2D(uFlowMap, textCoords) * uDissipation;
        //vec4 color = vec4(0.0, 0.0, 0.0, 1.0) * uDissipation;

        vec2 mouseTexPos = (uMousePosition + 1.0) * 0.5;
        vec2 cursor = vTextureCoord - mouseTexPos;
        cursor.x *= uAspect;

        vec3 stamp = vec3(uVelocity * vec2(1.0, -1.0), 1.0 - pow(1.0 - min(1.0, length(uVelocity)), 3.0));
        float falloff = smoothstep(uFalloff, 0.0, length(cursor)) * uAlpha;
        color.rgb = mix(color.rgb, stamp, vec3(falloff));

        // handle premultiply alpha
        color.rgb = color.rgb * color.a;

        gl_FragColor = color;
    }
`;

// displacement shaders
export const displacementVs = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif

    // default mandatory variables
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;

    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;

    uniform mat4 planeTextureMatrix;

    // custom variables
    varying vec3 vVertexPosition;
    varying vec2 vPlaneTextureCoord;
    varying vec2 vTextureCoord;

    void main() {

        vec3 vertexPosition = aVertexPosition;

        gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

        // varyings
        vTextureCoord = aTextureCoord;
        vPlaneTextureCoord = (planeTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
        vVertexPosition = vertexPosition;
    }
`;

export const displacementFs = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif

    varying vec3 vVertexPosition;
    varying vec2 vPlaneTextureCoord;
    varying vec2 vTextureCoord;

    uniform sampler2D planeTexture;
    uniform sampler2D uFlowTexture;

    void main() {
        // our flowmap
        vec4 flowTexture = texture2D(uFlowTexture, vTextureCoord);

        // distort our image texture based on the flowmap values
        vec2 distortedCoords = vPlaneTextureCoord;
        distortedCoords -= flowTexture.xy * 0.1;

        // get our final texture based on the displaced coords
        vec4 texture = texture2D(planeTexture, distortedCoords);

        // get a B&W version of our image texture
        vec4 textureBW = vec4(1.0);
        textureBW.rgb = vec3(texture.r * 0.3 + texture.g * 0.59 + texture.b * 0.11);

        // mix the BW image and the colored one based on our flowmap color values
        float mixValue = clamp((abs(flowTexture.r) + abs(flowTexture.g) + abs(flowTexture.b)) * 1.5, 0.0, 1.0);
        texture = mix(texture, textureBW, mixValue);

        // switch between this 2 lines to see what we have drawn onto our flowmap
        //gl_FragColor = flowTexture;
        gl_FragColor = texture;
    }
`;
