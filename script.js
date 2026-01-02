import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCPTVnWiPSF4fSGnjIjzMGs5g9WFIVBkc4",
  authDomain: "teacher-tracker-295f6.firebaseapp.com",
  projectId: "teacher-tracker-295f6",
  storageBucket: "teacher-tracker-295f6.firebasestorage.app",
  messagingSenderId: "357373042792",
  appId: "1:357373042792:web:2f9e6752de9b649cebdbdd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const teachers = [
  "Beau Austin","Heather Bretschneider","Courtney Crawford","Coach Griffin",
  "Allyson Jones","Kristi Logan","Ethan Merrow","Ralph Neeley","Kelly Bagwell",
  "Samuel Buchan","Andrew Dyer","Matthew Gruhn","Angelica Jones","Stacy Loverde",
  "Kimber Ikows","Mallory Nonnemaker","Ura Barahor","Jonathan Cantrell",
  "Walter Ecke","Joshua Herring","Tommy Jones","Brittany Lundrigan",
  "Jessica Mueller","Jennifer O'Hanlon","Jason Barnes","Elizabeth Casper",
  "Dr. Amy Farah","Nicholas Hodgson","Gregory Justice","Angela Martin",
  "Beth Murphy","Nathan O'Hanlon","Kennedy Barter","Darla Collins",
  "Rhonda Forrester","Reid Howard","Jeremy Kemp","Tiann Myer","Lori Oliver",
  "Carin Booth","Jenna Coon","Abram Gainey","Adrian Hower","Sarah Kent",
  "Allan McGathey","Grace Nadeau","Michael Parker","Summer Brackett",
  "Rebekah Cooper","Stephanie Gray","Cam Jackson","Samantha Liss",
  "Kimberly McGuirt","Troy Nasworthy","Tracy Parker","Joshua Parks",
  "Brian Pope","Micah Porter","Samuel Pruitt","Travis Raley","Denise Ramsey",
  "Shannon Reed","Steve Rothschild","John Rowland","Deborah Rubin",
  "Troy Russell","Katie Scall","Kassie Scott","Daniel Spiegel",
  "Jodi Lopez Sulak","Derek Tiller","Joshua Travis"
];

const select = document.getElementById("teacherSelect");
const search = document.getElementById("search");
const map = document.getElementById("map");
const markersDiv = document.getElementById("markers");

let activeTeacher = "";

// Populate dropdown
function populate(list) {
  select.innerHTML = `<option value="">Select a teacher</option>`;
  list.forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  });
}

populate(teachers);

// Search filter
search.addEventListener("input", () => {
  const value = search.value.toLowerCase();
  const filtered = teachers.filter(t => t.toLowerCase().includes(value));
  populate(filtered);
});

select.addEventListener("change", () => {
  activeTeacher = select.value;
});

// Click map → save location
map.addEventListener("click", async (e) => {
  if (!activeTeacher) return;

  const rect = map.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  await setDoc(doc(db, "locations", activeTeacher), { x, y });
});

// Live updates across devices
onSnapshot(collection(db, "locations"), snapshot => {
  markersDiv.innerHTML = "";
  snapshot.forEach(docSnap => {
    const { x, y } = docSnap.data();
    const marker = document.createElement("div");
    marker.className = "marker";
    marker.style.left = x + "px";
    marker.style.top = y + "px";
    markersDiv.appendChild(marker);
  });
});
