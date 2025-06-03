import Image from "next/image";
import S from "./card.module.css";
import { typeColorMap, typeMap } from "@/app/_constants/type";
import Link from "next/link";
interface Props {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export default function Card({ id, name, image, types }: Props) {
  return (
    <div className={S.card}>
      <Link href={`/pokemon/${id}`}>
        <h2>{name}</h2>
        <h4>도감 번호: {id.toString().padStart(4, "0")}</h4>
        <div className={S.imgContainer}>
          <Image src={image} alt={name} width={100} height={100} />
        </div>
        <div className={S.typeContainer}>
          {types.map((type) => (
            <div
              key={type}
              className={S.type}
              style={{ backgroundColor: typeColorMap[type as keyof typeof typeColorMap] }}
            >
              {typeMap[type as keyof typeof typeMap]}
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
}
