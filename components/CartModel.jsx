// "use client";

// import Image from "next/image";
// import { useCart } from "@/context/CartContext";
// import { useState, useEffect } from "react";
// import { FaWhatsapp, FaRegCopy, FaTimes } from "react-icons/fa";
// import { createPortal } from "react-dom";

// import PayButton from "./PayButton";

// const formatCurrency = (amount) => {
//   if (isNaN(amount)) return "₦0";
//   return new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     minimumFractionDigits: 0,
//   }).format(amount);
// };

// const CartModel = ({ onClose }) => {
//   const { cart, removeFromCart, getSubtotal } = useCart();
//   const subtotal = getSubtotal() || 0;
//   const total = subtotal;

//   const [showBank, setShowBank] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   const bankDetails = {
//     accountName: "Okeke Obinna Franklin",
//     accountNumber: "2253956994",
//     bankName: "Zenith Bank",
//     whatsapp: "+2348103919717",
//   };

//   const whatsappMessage = encodeURIComponent(
//     `Hi, I have transferred ${formatCurrency(total)} to your account ${
//       bankDetails.accountNumber
//     } (${bankDetails.bankName}). Please confirm.`
//   );
//   const whatsappLink = `https://wa.me/${bankDetails.whatsapp}?text=${whatsappMessage}`;

//   const copyAccountNumber = () => {
//     navigator.clipboard.writeText(bankDetails.accountNumber);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // Avoid SSR hydration issues
//   useEffect(() => setMounted(true), []);

//   if (!mounted) return null;

//   return createPortal(
//     <div className="fixed inset-0 z-[1000]">
//       {/* Overlay */}
//       <div
//         className="absolute inset-0 bg-black bg-opacity-40"
//         onClick={onClose}
//       />

//       {/* Sidebar */}
//       <div className="absolute top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg p-6 flex flex-col gap-6 overflow-y-auto z-[1100]">
//         {/* Close Button */}
//         <button
//           className="absolute top-4 right-4 text-gray-600 hover:text-black z-50"
//           onClick={onClose}
//         >
//           <FaTimes size={22} />
//         </button>

//         <h2 className="font-semibold text-lg">Shopping Cart</h2>

//         {cart.length === 0 ? (
//           <div className="mt-4">Cart is Empty</div>
//         ) : (
//           <div className="flex flex-col gap-4">
//             {cart.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex gap-4 items-center justify-between border-b pb-2"
//               >
//                 <Image
//                   src={item.image}
//                   alt={item.name}
//                   width={80}
//                   height={80}
//                   className="object-cover rounded-md"
//                 />
//                 <div className="flex flex-col flex-1 gap-2">
//                   <div className="flex justify-between items-center">
//                     <h3 className="font-semibold">{item.name}</h3>
//                     <span>{formatCurrency(item.price)}</span>
//                   </div>
//                   <div className="flex justify-between items-center text-sm">
//                     <span>Qty: {item.quantity}</span>
//                     <span
//                       className="text-red-600 cursor-pointer"
//                       onClick={() => removeFromCart(item.id)}
//                     >
//                       Remove
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Subtotal & Total */}
//         <div className="mt-4 border-t pt-4 flex flex-col gap-2">
//           <div className="flex justify-between font-semibold">
//             <span>Subtotal</span>
//             <span>{formatCurrency(subtotal)}</span>
//           </div>
//           <div className="flex justify-between font-bold text-lg">
//             <span>Total</span>
//             <span>{formatCurrency(total)}</span>
//           </div>
//           <p className="text-gray-500 text-sm">
//             Delivery fees are negotiated on call (excluded here)
//           </p>
//         </div>

//         {/* Payment Options */}
//         {!showBank ? (
//           <div className="flex justify-between gap-2 mt-4">
//             <PayButton
//               className="flex-1 rounded-md py-3 px-4 ring-1 ring-gray-500"
//               email={userEmail}
//               amount={total}
//             />
//             <button
//               className="flex-1 rounded-md py-3 px-4 bg-black text-white font-bold"
//               onClick={() => setShowBank(true)}
//             >
//               Bank Transfer
//             </button>
//           </div>
//         ) : (
//           <div className="flex flex-col gap-3 mt-4 border-t pt-4">
//             <h3 className="font-semibold">Bank Transfer Details</h3>
//             <p>
//               <strong>Bank:</strong> {bankDetails.bankName}
//             </p>
//             <p>
//               <strong>Account Name:</strong> {bankDetails.accountName}
//             </p>
//             <div className="flex items-center gap-2">
//               <strong>Account Number:</strong>
//               <span className="bg-gray-100 p-1 rounded">
//                 {bankDetails.accountNumber}
//               </span>
//               <button
//                 className="text-gray-600 hover:text-black"
//                 onClick={copyAccountNumber}
//                 title="Copy account number"
//               >
//                 <FaRegCopy />
//               </button>
//             </div>
//             {copied && <span className="text-green-600 text-xs">Copied!</span>}
//             <p>
//               <strong>Amount to Pay:</strong> {formatCurrency(total)}
//             </p>
//             <p className="text-gray-500">
//               After payment, send the receipt via WhatsApp:
//             </p>
//             <a
//               href={whatsappLink}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center justify-center gap-2 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
//             >
//               <FaWhatsapp size={20} /> Send Receipt via WhatsApp
//             </a>
//           </div>
//         )}
//       </div>
//     </div>,
//     document.body
//   );
// };

// export default CartModel;

// chat

"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { FaWhatsapp, FaRegCopy, FaTimes } from "react-icons/fa";
import { createPortal } from "react-dom";

import PayButton from "./PayButton";

const formatCurrency = (amount) => {
  if (isNaN(amount)) return "₦0";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

const CartModel = ({ onClose }) => {
  const [userEmail, setUserEmail] = useState("");

  const { cart, removeFromCart, getSubtotal } = useCart();
  const subtotal = getSubtotal() || 0;
  const total = subtotal;

  const [showBank, setShowBank] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  const bankDetails = {
    accountName: "Okeke Obinna Franklin",
    accountNumber: "2253956994",
    bankName: "Zenith Bank",
    whatsapp: "+2348103919717",
  };

  const whatsappMessage = encodeURIComponent(
    `Hi, I have transferred ${formatCurrency(total)} to your account ${
      bankDetails.accountNumber
    } (${bankDetails.bankName}). Please confirm.`
  );
  const whatsappLink = `https://wa.me/${bankDetails.whatsapp}?text=${whatsappMessage}`;

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(bankDetails.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="absolute top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg p-6 flex flex-col gap-6 overflow-y-auto z-[1100]">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black z-50"
          onClick={onClose}
        >
          <FaTimes size={22} />
        </button>

        <h2 className="font-semibold text-lg">Shopping Cart</h2>

        {cart.length === 0 ? (
          <div className="mt-4">Cart is Empty</div>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center justify-between border-b pb-2"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="object-cover rounded-md"
                />
                <div className="flex flex-col flex-1 gap-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{item.name}</h3>
                    <span>{formatCurrency(item.price)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Qty: {item.quantity}</span>
                    <span
                      className="text-red-600 cursor-pointer"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Subtotal & Total */}
        <div className="mt-4 border-t pt-4 flex flex-col gap-2">
          <div className="flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <p className="text-gray-500 text-sm">
            Delivery fees are negotiated on call (excluded here)
          </p>
        </div>

        {/* ✅ Email Input */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        {/* Payment Options */}
        {!showBank ? (
          <div className="flex justify-between gap-2 mt-4">
            <PayButton
              email={userEmail || "guest@example.com"}
              amount={total}
            />
            <button
              className="flex-1 rounded-md py-3 px-4 bg-black text-white font-bold"
              onClick={() => setShowBank(true)}
            >
              Bank Transfer
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mt-4 border-t pt-4">
            <h3 className="font-semibold">Bank Transfer Details</h3>
            <p>
              <strong>Bank:</strong> {bankDetails.bankName}
            </p>
            <p>
              <strong>Account Name:</strong> {bankDetails.accountName}
            </p>
            <div className="flex items-center gap-2">
              <strong>Account Number:</strong>
              <span className="bg-gray-100 p-1 rounded">
                {bankDetails.accountNumber}
              </span>
              <button
                className="text-gray-600 hover:text-black"
                onClick={copyAccountNumber}
                title="Copy account number"
              >
                <FaRegCopy />
              </button>
            </div>
            {copied && <span className="text-green-600 text-xs">Copied!</span>}
            <p>
              <strong>Amount to Pay:</strong> {formatCurrency(total)}
            </p>
            <p className="text-gray-500">
              After payment, send the receipt via WhatsApp:
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              <FaWhatsapp size={20} /> Send Receipt via WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default CartModel;
