// -------------------
// Imports
// -------------------
import Link from "next/link";
import {pricingPlans} from "@/data/constants";

// -------------------
// Pricing plans
// -------------------
const Plans = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5 my-20">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`pricing-table dark:border dark:border-gray-500 text-center p-8 rounded-lg ${plan.recommended ? "shadow-xl mt-20 md:mt-0" : "shadow-lg"} transition-all duration-300 hover:shadow-xl`}
          >
            {plan.recommended && (
              <div className="absolute top-[920px] md:top-[520px] lg:top-[480px] left-1 md:left-auto sm:left-5 bg-blue-500 text-white font-bold py-3 px-6 rounded-bl-lg rounded-tr-lg">
                Bhai ki mano, aur ye subscription lo!
              </div>
            )}
            <div className="head border-b border-gray-200 pb-12 transition-all duration-500 hover:border-purple-600">
              <h4 className="title text-xl font-bold mb-5 text-black dark:text-white">
                {plan.title}
              </h4>
            </div>
            <div className="content">
              <div className="price relative w-24 h-24 mx-auto -mt-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md transition-all duration-500 hover:scale-110">
                <h1 className="text-white text-2xl font-bold absolute inset-0 flex items-center justify-center">
                  {plan.price}
                </h1>
              </div>
              <ul className="list-none mb-5 pt-4">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className={`my-5 text-sm text-gray-600 dark:text-gray-300 text-left`}
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              {/* <div className="sign-up">
              <Link
              href="#"
                className="btn inline-block py-3 px-10 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300 hover:shadow-lg relative overflow-hidden group"
              >
              <span className="absolute inset-0 w-full h-full transition-all duration-300 transform scale-0 group-hover:scale-100 group-hover:bg-white rounded-full"></span>
                <span className="relative group-hover:text-blue-600">Signup Now</span>
              </Link>
            </div> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Plans;
