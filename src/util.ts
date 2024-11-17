import { Triplet } from '@react-three/cannon'
import { Vector3 } from 'three'

export const tripletToVector = (vec: Triplet): Vector3 => new Vector3(vec[0], vec[1], vec[2])
export const vectorToTriplet = (vec: Vector3): Triplet => [vec.x, vec.y, vec.z]
