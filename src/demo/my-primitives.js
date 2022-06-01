import primitives from './primitives';
import initBuffers from './create-buffer';


const myPrimitives = (gl, modelType, info) => {
    var bufferInfo;
    switch(modelType) {
        case "Cube":
            bufferInfo = primitives.createCubeBufferInfo(
                gl,
                info.width,  // width
                info.height,  // height
                info.depth,  // depth
            );
            break;

        case "Sphere":
            bufferInfo = primitives.createSphereBufferInfo(
                gl,
                info.radius,  // radius
                info.subdivisionsAround,    // subdivisions around
                info.subdivisionsDown,    // subdivisions down
            );
            break;

        case "Cone":
            bufferInfo = primitives.createTruncatedConeBufferInfo(
                gl,
                info.bottomRadius,
                info.topRadius,
                info.height,
                info.subdivisionsAround,    // subdivisions around
                info.subdivisionsDown,    // subdivisions down
            );
            break;

        default:
            console.warn("No Model type specified, defaulting to Cube");
            bufferInfo = primitives.createCubeBufferInfo(
                gl,
                1,  // width
                1,  // height
                1,  // depth
            )
        }
    return bufferInfo;
  };
  
  export default myPrimitives;