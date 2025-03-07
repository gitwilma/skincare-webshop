import Image from "next/image";

export default function Header() {
  return (
    <>
      <Image src="/Beauty.png" alt="Beauty" width={100} height={100} />
      <span>Admin</span>
      <span>🗑</span>
    </>
  );
}
