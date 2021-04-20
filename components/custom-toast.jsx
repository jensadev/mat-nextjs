import { motion } from 'framer-motion';

import styles from './custom-toast.module.scss';

export default function CustomToast({ appearance, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${styles.bubble} ${styles.speech} alert-${appearance}`}>
      {children}
    </motion.div>
  );
}
// import { DefaultToast } from 'react-toast-notifications';

// export default function CustomToast({ children, ...props }) {
//   return (
//     <DefaultToast {...props}>
//       <div>{children}</div>
//     </DefaultToast>
//   );
// }
