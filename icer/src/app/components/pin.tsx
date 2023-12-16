"use client";
import { useState } from "react";
import { useRecoilState } from "recoil";
import {
  parentDiscussionIdAtom,
  sendAnsQuestionDialogAtom,
} from "../recoil/atom";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { formatGetDiscussionItem } from "../func/api";
import { useGLTF } from "@react-three/drei";
import { typeRandomPosition } from "./pinposition";

export function Pin(props: {
  color: "orange" | "blue";
  randomPositionTmp: typeRandomPosition;
  item: formatGetDiscussionItem;
}) {
  const [hovered, setHover] = useState(false);
  // https://sketchfab.com/3d-models/object10-push-pin-81aadd826c85488180fa3fa2d5f7a0aa
  const gltf = useGLTF(
    (props.item.isee_level <= 1 && "/push_pin_1/scene.gltf") ||
      (props.item.isee_level == 2 && "/push_pin_2/scene.gltf") ||
      (props.item.isee_level == 3 && "/push_pin_3/scene.gltf") ||
      (props.item.isee_level == 4 && "/push_pin_4/scene.gltf") ||
      "/push_pin_5/scene.gltf"
  );
  const cloneedCeane = gltf.scene.clone();
  cloneedCeane.scale.set(0.03, 0.03, 0.03);
  // gltf.scene.position.set(0, 0, 0.2);
  cloneedCeane.rotation.set(
    props.randomPositionTmp.gltfRotation[0],
    props.randomPositionTmp.gltfRotation[1],
    props.randomPositionTmp.gltfRotation[2]
  );

  // gltf.scene.lookAt(0, 0, 0);
  const [discussionId, setDiscussionId] = useRecoilState(
    parentDiscussionIdAtom
  );
  const [openSendQuestionDialog, setOpenopenSendQuestionDialog] =
    useRecoilState(sendAnsQuestionDialogAtom);
  // gltf.scene.position.set();
  return (
    // <TransformControls>
    <mesh
      position={[0, 0, 0]}
      rotation={[
        props.randomPositionTmp.nullRotation[0],
        props.randomPositionTmp.nullRotation[1],
        props.randomPositionTmp.nullRotation[2],
      ]}
    >
      <mesh
        position={[
          props.randomPositionTmp.null2position[0],
          props.randomPositionTmp.null2position[1],
          props.randomPositionTmp.null2position[2],
        ]}
        rotation={[0, 0, 0]}
      >
        <primitive
          position={[0, 0, 0]}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
          onClick={() => {
            setDiscussionId(props.item.discussion_id);
            setOpenopenSendQuestionDialog(true);
          }}
          color={hovered ? "hotpink" : "orange"}
          object={cloneedCeane}
        />
      </mesh>
    </mesh>
    // </TransformControls>
  );
}
