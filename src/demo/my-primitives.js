import primitives from './primitives';


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
                4,  // width
                4,  // height
                4,  // depth
            )
        }
    return bufferInfo;
  };
  
  export default myPrimitives;