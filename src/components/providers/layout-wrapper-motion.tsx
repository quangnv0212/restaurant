import { motion } from 'framer-motion';

const LayoutWrapperMotion = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <motion.div
        className="flex-1"
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={{
          pageInitial: {
            opacity: 0,
            y: 50,
          },
          pageAnimate: {
            opacity: 1,
            y: 0,
          },
          pageExit: {
            opacity: 0,
            y: -50,
          },
        }}
        transition={{
          type: 'tween',
          ease: 'easeInOut',
          duration: 0.5,
        }}
      >
        <main>{children}</main>
      </motion.div>
    </>
  );
};

export default LayoutWrapperMotion;
