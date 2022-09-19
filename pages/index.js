import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { client } from "../utils";
import TransformedImage from "../components/TransformedImage";

export default function Home({ products }) {
  const [finalData, setFinalData] = useState();
  const [updatedResult, setUpdatedResult] = useState([]);
  useEffect(() => {
    setUpdatedResult(
      products.map(async (prop) => {
        const data = new FormData();
        data.append("file", prop.images[0].src);
        data.append("upload_preset", "c_tags");

        try {
          const res = await fetch(
            "https://api.cloudinary.com/v1_1/kizmelvin/image/upload",
            {
              method: "POST",
              body: data,
            }
          );
          const file = await res.json();
          // console.log(file);
          return {
            ...prop,
            images: [
              {
                src: file.url,
                public_id: file.public_id,
              },
            ],
          };
        } catch (error) {
          console.error(error);
        }
      })
    );
  }, [products]);

  setTimeout(async () => {
    await Promise.all(updatedResult).then((values) => {
      setFinalData(values);
    });
  }, 2000);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {finalData &&
          finalData.map((data) => (
            <div key={data.id}>
              <h4>{data.title}</h4>
              <TransformedImage
                img_id={data.images[0].public_id}
                title={data.title}
              />
              <h2>
                {" "}
                <strong># {data.variants[0].price}</strong>{" "}
              </h2>
            </div>
          ))}
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const products = await client.product.fetchAll(); // Fetch product

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};
