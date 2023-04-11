import { XPay } from '@xstak/xpay-element-stage';
import { Payment } from './payment';
function App() {

  return (
    <XPay xpay={{ publishableKey: "", accountId: "", hmacSecret: ""}}>
    <Payment />
    </XPay>
  )
}

export default App
