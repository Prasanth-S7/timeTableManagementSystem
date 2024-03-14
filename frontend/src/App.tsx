import { motion, useScroll } from "framer-motion";
function App() {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <div className="text-white font-heading ">
        <div className=" w-full h-full ">
          <nav className=" sticky -z-10 top-0 p-3 mx-auto border-b-2 border-gray-600 font-semibold">
            <ul className="flex justify-center gap-12 items-center">
              <li>Linear</li>
              <li>Features</li>
              <li>Method</li>
              <li>Customers</li>
              <li>Changelog</li>
              <li>Pricing</li>
              <li>Company</li>
              <li>Contact</li>
              <li>Login</li>
              <li>
                <button className="rounded-full bg-blue-700 py-1 px-2 text-center">Signup</button></li>
            </ul>
          </nav>
          <motion.div className="flex justify-center sticky top-0 z-10">
            <div className=" h-3/4 w-2/4 px-5 ">
              <div className="flex justify-center ">
                <motion.div className="text-center">
                  <motion.div
                    initial={{ opacity: 0 }} whileInView={{
                      opacity: 1, transition: {
                        duration: 6,
                        type: "spring",
                      }
                    }}
                    className=" text-7xl  font-semibold mt-24 "> Linear is a better way to build products</motion.div>
                  <motion.div
                    initial={{ opacity: 0 }} whileInView={{
                      opacity: 1, transition: {
                        duration: 8,
                        type: "spring",
                      }
                    }} className=" mt-9 text-2xl">Meet the new standard for modern software development. Streamline issues, sprints, and product roadmaps.</motion.div>
                  <div className="mt-8">
                    <motion.button initial={{ opacity: 0 }} whileInView={{
                      opacity: 1, transition: {
                        duration: 10,
                        type: "spring",
                      }
                    }} whileHover={{ scale: 1.2 }} drag='x' dragConstraints={{ left: -100, right: 100 }} className="bg-blue-500 px-5 py-3 rounded-full text-lg">Get Started</motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
          <div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
