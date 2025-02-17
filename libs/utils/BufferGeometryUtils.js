import {
    BufferGeometry,
    Float32BufferAttribute,
    TriangleFanDrawMode,
    TriangleStripDrawMode,
    TrianglesDrawMode,
} from '../three.module.js';

export function toTrianglesDrawMode( geometry, drawMode ) {

    if ( drawMode === TrianglesDrawMode ) {
        return geometry;
    }

    const index = geometry.getIndex();
    const position = geometry.getAttribute( 'position' );

    if ( index === null ) {
        console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.' );
        return geometry;
    }

    const indexCount = index.count;
    let newIndices = [];

    if ( drawMode === TriangleFanDrawMode ) {
        // gl.TRIANGLE_FAN
        for ( let i = 2; i < indexCount; i ++ ) {
            newIndices.push( index.getX( 0 ) );
            newIndices.push( index.getX( i - 1 ) );
            newIndices.push( index.getX( i ) );
        }
    } else if ( drawMode === TriangleStripDrawMode ) {
        // gl.TRIANGLE_STRIP
        for ( let i = 0; i < indexCount - 2; i ++ ) {
            if ( i % 2 === 0 ) {
                newIndices.push( index.getX( i ) );
                newIndices.push( index.getX( i + 1 ) );
                newIndices.push( index.getX( i + 2 ) );
            } else {
                newIndices.push( index.getX( i + 2 ) );
                newIndices.push( index.getX( i + 1 ) );
                newIndices.push( index.getX( i ) );
            }
        }
    }

    if ( newIndices.length / 3 !== indexCount - 2 ) {
        console.error( 'THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.' );
    }

    // Build final geometry
    const newGeometry = geometry.clone();
    newGeometry.setIndex( newIndices );
    newGeometry.clearGroups();

    return newGeometry;
} 