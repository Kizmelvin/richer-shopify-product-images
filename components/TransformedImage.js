import { Cloudinary } from "@cloudinary/url-gen";
import { source } from "@cloudinary/url-gen/actions/overlay";
import { text } from "@cloudinary/url-gen/qualifiers/source";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { Position } from "@cloudinary/url-gen/qualifiers";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { TextStyle } from "@cloudinary/url-gen/qualifiers/textStyle";

function TransformedImage({ img_id, title }) {
  // new cloudinary instance with our cloudName
  const cld = new Cloudinary({
    cloud: {
      cloudName: "Kizmelvin",
    },
  });

  let baseImage = cld.image(`${img_id}`).resize(scale().width(500).height(700));

  baseImage.overlay(
    source(
      text(`${title}`, new TextStyle("Nunito", 50)).textColor("orangered")
    ).position(new Position().gravity(compass("center")).offsetY(250))
  );
  const transImage = baseImage.toURL();

  return <img src={transImage} alt="product-img" width={400} height={400} />;
}

export default TransformedImage;
