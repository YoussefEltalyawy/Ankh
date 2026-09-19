import { motion } from "framer-motion";

function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="pt-8 pb-[30px] px-8 flex justify-between items-center"
    >
      <h1 className="font-manrope text-2xl md:text-[28px] font-bold">Ankh</h1>
    </motion.div>
  );
}

export default Header;
