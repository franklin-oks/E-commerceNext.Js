"use client";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useState, useEffect, useRef } from "react";
import { FaWhatsapp, FaRegCopy, FaTimes } from "react-icons/fa";
import { createPortal } from "react-dom";
// paystack
import PayWithPaystackButton from "./paystack/PayButton";

const formatCurrency = (amount) => {
  if (isNaN(amount)) return "₦0";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

function generateCheckoutId() {
  // simple UUID-like id for checkout tracking
  return (
    "co_" +
    Math.random().toString(36).slice(2, 10) +
    "-" +
    Date.now().toString(36)
  );
}

export default function CartModel({ onClose, defaultEmail = "" }) {
  const { cart, removeFromCart, getSubtotal } = useCart();
  const subtotal = getSubtotal() || 0;
  const total = subtotal;

  // derive cart items in the shape you want to send
  const cartItems = (cart || []).map((it) => ({
    id: it.id,
    name: it.name,
    price: it.price,
    quantity: it.quantity,
    image: it.image || null,
  }));

  // local UI state
  const [showBank, setShowBank] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const panelRef = useRef(null);

  // checkout metadata
  const [customerEmail, setCustomerEmail] = useState(defaultEmail || "");
  const [emailError, setEmailError] = useState("");
  const [checkoutId] = useState(() => generateCheckoutId());

  // Loading state for any future actions (not used now)
  const [processing, setProcessing] = useState(false);

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

  const copyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(bankDetails.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard errors
    }
  };

  // mount guard for SSR
  useEffect(() => setMounted(true), []);

  // lock body scroll while visible (only when visible)
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose && onClose();
    }, 0);
  };

  useEffect(() => {
    if (!visible) return;

    function handlePointerDown(e) {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target)) {
        handleClose();
      }
    }

    function handleKeyDown(e) {
      if (e.key === "Escape") handleClose();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!mounted) return null;
  if (!visible) return null; // unmount when not visible

  // Quick email validation
  const validateEmail = (value) => {
    if (!value) return "Email is required for card payments";
    // simple regex: not perfect but ok for UX
    const re = /\S+@\S+\.\S+/;
    if (!re.test(value)) return "Enter a valid email address";
    return "";
  };

  // we pass amountNaira to PayWithPaystackButton — ensure it's a number (no currency formatting)
  const amountNaira = Number(total) || 0;

  return createPortal(
    <div className="fixed inset-0 z-[1000] pointer-events-none">
      {/* Transparent click-catcher (no dark overlay) — pointer-events-auto so it captures taps */}
      <div
        className="absolute inset-0 pointer-events-auto"
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <aside
        ref={panelRef}
        className="absolute top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg p-6 flex flex-col gap-6 overflow-y-auto z-[1010] pointer-events-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black z-50"
          onClick={handleClose}
          aria-label="Close cart"
        >
          <FaTimes size={22} />
        </button>

        <h2 className="font-semibold text-lg">Shopping Cart</h2>

        {!cart || cart.length === 0 ? (
          <div className="mt-4">Cart is Empty</div>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center justify-between border-b pb-2"
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-cover rounded-md"
                    onError={(e) => {
                      try {
                        const img = e.currentTarget;
                        if (img && img.src) img.src = "/fallback-product.jpg";
                      } catch {}
                    }}
                  />
                ) : (
                  <div className="w-[80px] h-[80px] bg-gray-100 rounded-md flex items-center justify-center text-sm text-gray-500">
                    No image
                  </div>
                )}

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

        {/* Small Email input used for Paystack */}
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email (for card payment receipts)
          </label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => {
              setCustomerEmail(e.target.value);
              setEmailError(validateEmail(e.target.value));
            }}
            placeholder="you@example.com"
            className="w-full border rounded px-3 py-2 text-sm"
            aria-label="Customer email"
          />
          {emailError && (
            <p className="text-red-600 text-xs mt-1">{emailError}</p>
          )}
        </div>

        {/* Payment Options */}
        {!showBank ? (
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex flex-col gap-2">
              <button
                className="flex-1 rounded-md py-3 cursor-pointer px-4 bg-black text-white font-bold"
                onClick={() => setShowBank(true)}
              >
                Bank Transfer
              </button>

              {/* Paystack button — disabled if email invalid or no items */}
              <div className="flex-1 rounded-md py-3 px-4 bg-blue-600 text-white font-bold">
                <PayWithPaystackButton
                  email={customerEmail}
                  amountNaira={amountNaira}
                  items={cartItems}
                  metadata={{ checkoutId }}
                />
              </div>
            </div>

            {/* Optional quick note */}
            <p className="text-xs text-gray-500">
              You can pay with card (Paystack) or use the bank transfer option.
              For card payments we need your email to send a receipt.
            </p>
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
                aria-label="Copy account number"
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
      </aside>
    </div>,
    document.body
  );
}
