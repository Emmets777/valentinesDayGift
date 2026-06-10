import "./Carrosel.css";
import { useRef } from "react";
import photo1 from "../photos/photo1.jpeg";
import photo2 from "../photos/photo2.jpeg";
import photo3 from "../photos/photo3.jpeg";
import photo4 from "../photos/photo4.jpeg";
import photo5 from "../photos/photo5.jpeg";
import photo6 from "../photos/photo6.jpeg";
import photo7 from "../photos/photo7.jpeg";

function Carrosel() {
  const carouselRef = useRef(null);

  return (
    <div className="carouselWrapperB">
      <div className="carouselViewportB" ref={carouselRef}>
        <div className="utilBooks">
          {/* PRIMEIRA LINHA */}
          <div className="cardProductB">
            <img src={photo1} alt="algorithms Book" className="productPicB" />
          </div>

          <div className="cardProductB">
            <img src={photo2} alt="Clean Code Book" className="productPicB" />
          </div>

          <div className="cardProductB">
            <img
              src={photo3}
              alt="JavaScript Logics Book"
              className="productPicB"
            />
          </div>

          <div className="cardProductB">
            <img
              src={photo4}
              alt="Intensive Python Course Book"
              className="productPicB"
            />
          </div>

          <div className="cardProductB">
            <img
              src={photo5}
              alt="Use Your Head! development Book"
              className="productPicB"
            />
          </div>

          <div className="cardProductB">
            <img
              src={photo6}
              alt="Use Your Head! development Book"
              className="productPicB"
            />
          </div>

          <div className="cardProductB">
            <img
              src={photo7}
              alt="Use Your Head! development Book"
              className="productPicB"
            />
          </div>

          {/* DUPLICAÇÃO PARA LOOP INFINITO */}

          <div className="cardProductB">
            <img src={photo1} alt="algorithms Book" className="productPicB" />
          </div>

          <div className="cardProductB">
            <img src={photo2} alt="Python Course" className="productPicB" />
          </div>

          <div className="cardProductB">
            <img
              src={photo3}
              alt="JavaScript Logics Book"
              className="productPicB"
            />
          </div>

          <div className="cardProductB">
            <img
              src={photo4}
              alt="Intensive Python Course Book"
              className="productPicB"
            />
          </div>

          <div className="cardProductB">
            <img
              src={photo5}
              alt="Use Your Head! development Book"
              className="productPicB"
            />
          </div>

          <div className="cardProductB">
            <img
              src={photo6}
              alt="Use Your Head! development Book"
              className="productPicB"
            />
          </div>

          <div className="cardProductB">
            <img
              src={photo7}
              alt="Use Your Head! development Book"
              className="productPicB"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrosel;
