import { useEffect } from "react";

function AboutUs() {
  useEffect(() => {
    window.scrollTo({ top: 80, behavior: "smooth" });
  }, []);


  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-italianno font-bold text-[#522815]  text-center mb-14">About Vinatlia</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <img
              src="https://i.pinimg.com/736x/b9/9e/8e/b99e8e93875eaae48602868e6679dc71.jpg" 
              alt="Sunglasses Display"
              className="rounded-lg w-10/12 h-80 object-cover shadow-md"
            />
          </div>
          <div>
            <p className="text-lg leading-relaxed mb-6 text-[#522815]  ">
              Welcome to <strong>Vinatlia</strong>, your destination for trendy
              and timeless sunglasses. At Vinatlia, we believe in blending
              elegance with functionality. Whether you are looking for bold
              statement frames or sleek minimalistic designs, we’ve got
              something for every style and personality.
            </p>
            <p className="text-lg leading-relaxed mb-6 text-[#522815] ">
              Each pair of sunglasses is crafted with precision and care,
              ensuring superior quality and protection against UV rays. With a
              curated collection for men and women, we aim to make your vision
              clearer and your look sharper.
            </p>
            <p className="text-lg leading-relaxed text-[#522815] ">
              Step into the world of Vinatlia and find the perfect shades to
              elevate your everyday look.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <h3 className="text-2xl font-semibold mb-4 text-[#522815] ">Why Choose Us?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="font-bold text-xl mb-2 text-[#522815] ">Premium Quality</h4>
              <p className="text-[#522815] ">
                Crafted with the finest materials to ensure durability and
                comfort.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="font-bold text-xl mb-2 text-[#522815] ">Stylish Designs</h4>
              <p className="text-[#522815] ">
                A wide variety of sunglasses to suit every taste and occasion.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="font-bold text-xl mb-2 text-[#522815] ">Affordable Luxury</h4>
              <p className="text-[#522815] ">
                Bringing you the latest trends without breaking the bank.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
