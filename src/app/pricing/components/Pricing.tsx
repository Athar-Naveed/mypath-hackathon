// ---------------------
// Imports
// ---------------------
import Plans from "./Plans";

export default function PricingTables() {
  return (
    <>
      <section className="my-36">
        <div className="heading my-20 text-center">
          <h1 className="h1 text-4xl text-black dark:text-white">Our Pricing</h1>
          <p className="span text-xl text-center pt-5 text-gray-500">
            Choose the plan that fit your needs
          </p>
        </div>
        {/* <!-- Pricing toggle --> */}
        <div className="flex justify-center max-w-[14rem] m-auto my-8 lg:mb-16">
          <div className="relative border border-blue-500 px-10 py-2 rounded-full">
            <button className="text-blue-500 transition-colors duration-150 ease-in-out">
              Monthly
            </button>
          </div>
        </div>
        <Plans />
      </section>
    </>
  );
}
