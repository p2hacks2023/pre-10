"use client";
import Image from "next/image";
import App from "./components/3dtest";

import { RecoilRoot } from "recoil";
import CSR from "./csr/CSR";
import { Shutter } from "./components/shutter";

export default function Home() {
  return (
    <main>
      <Shutter />
      <CSR>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </CSR>
    </main>
  );
}
