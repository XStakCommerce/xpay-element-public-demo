import { XPay } from '@xstak/xpay-element';
import { Payment } from './payment';
function App() {
  return (
    <XPay xpay={{ publishableKey: import.meta.env.VITE_PUBLISHABLE_KEY, accountId: import.meta.env.VITE_ACCOUNT_ID, hmacSecret: import.meta.env.VITE_HMAC_SECRET}}>
    <Payment />
    </XPay>
  )
}

export default App
