// import { google } from "googleapis";

// const spreadsheetId = process.env.GOOGLE_SHEET_ID;

// function getAuth() {
//   return new google.auth.GoogleAuth({
//     credentials: {
//       client_email: process.env.GOOGLE_CLIENT_EMAIL,
//       private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
//     },
//     scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//   });
// }

// export async function getProducts() {
//   const auth = await getAuth();
//   const sheets = google.sheets({ version: "v4", auth });

//   const range = "Products!A2:J";
//   const response = await sheets.spreadsheets.values.get({
//     spreadsheetId,
//     range,
//   });

//   const rows = response.data.values || [];

//   return rows.map((row) => ({
//     id: row[0],
//     name: row[1],
//     oldPrice: row[2],
//     price: row[3],
//     isNew: row[4] === "TRUE",
//     stock: row[5],
//     image1: row[6],
//     image2: row[7],
//     image3: row[8],
//     createdAt: row[9],
//     description: row[10],
//   }));
// }

// export async function addProduct(product) {
//   const auth = await getAuth();
//   const sheets = google.sheets({ version: "v4", auth });

//   const values = [
//     [
//       product.id,
//       product.name,
//       product.oldPrice,
//       product.price,
//       product.isNew,
//       product.stock,
//       product.image1,
//       product.image2,
//       product.image3,
//       product.createdAt,
//     ],
//   ];

//   await sheets.spreadsheets.values.append({
//     spreadsheetId,
//     range: "Products!A:J",
//     valueInputOption: "USER_ENTERED",
//     requestBody: { values },
//   });
// }

// chat

import { google } from "googleapis";

const spreadsheetId = process.env.GOOGLE_SHEET_ID;

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

// Fetch products
export async function getProducts() {
  const auth = await getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const range = "Products!A2:K"; // A → K covers all 11 columns
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = response.data.values || [];

  return rows.map((row, index) => ({
    id: row[0] || `row-${index + 1}`, // fallback id if empty
    name: row[1] || "",
    oldPrice: row[2] || "",
    price: row[3] || "",
    isNew: row[4] === "TRUE",
    stock: row[5] || "",
    image1: row[6] || "",
    image2: row[7] || "",
    image3: row[8] || "",
    createdAt: row[9] || "",
    description: row[10] || "",
  }));
}

// Add product (one row only)
export async function addProduct(product) {
  const auth = await getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  // Ensure createdAt is set
  const createdAt =
    product.createdAt ||
    new Date().toISOString().slice(0, 19).replace("T", " ");

  // Ensure unique ID
  const id = product.id || Date.now().toString();

  const values = [
    [
      id,
      product.name || "",
      product.oldPrice || "",
      product.price || "",
      product.isNew ? "TRUE" : "FALSE",
      product.stock || "",
      product.image1 || "",
      product.image2 || "",
      product.image3 || "",
      createdAt,
      product.description || "",
    ],
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Products!A:K", // 11 columns
    valueInputOption: "USER_ENTERED",
    requestBody: { values },
  });

  return { success: true, id };
}
