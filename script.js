// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
      apiKey: "AIzaSyDWVxMKaOjD10i87pX-kF6bPG8HbUNwGCY",
      authDomain: "unierp-79b03.firebaseapp.com",
      projectId: "unierp-79b03",
      storageBucket: "unierp-79b03.firebasestorage.app",
      messagingSenderId: "62493715652",
      appId: "1:62493715652:web:72e922ae35048dbd40ad91",
      measurementId: "G-GW9W07608T"
    };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// FAQ Functions
export async function fetchFAQs() {
  const faqsRef = collection(db, "faqs");
  const snapshot = await getDocs(faqsRef);
  const faqs = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return faqs;
}

export function renderFAQs(faqs) {
  const faqContainer = document.getElementById('faq-container');
  faqContainer.innerHTML = '';
  
  faqs.forEach(faq => {
    const details = document.createElement('details');
    details.classList.add('flex', 'flex-col', 'rounded-lg', 'border', 'border-[#dbe0e6]', 'bg-white', 'px-[15px]', 'py-[7px]', 'group');
    details.innerHTML = `
      <summary class="flex cursor-pointer items-center justify-between gap-6 py-2">
        <p class="text-[#111418] text-sm font-medium leading-normal">${faq.question}</p>
        <div class="flex items-center gap-2">
          <button 
            class="delete-faq-btn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition-colors duration-200" 
            data-faq-id="${faq.id}"
            onclick="event.preventDefault(); event.stopPropagation();"
          >
            Delete
          </button>
          <div class="text-[#111418] group-open:rotate-180" data-icon="CaretDown" data-size="20px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
            </svg>
          </div>
        </div>
      </summary>
      <p class="text-[#617589] text-sm font-normal leading-normal pb-2">${faq.answer}</p>
    `;
    faqContainer.appendChild(details);
  });

  // Add event listeners to delete buttons
  const deleteButtons = document.querySelectorAll('.delete-faq-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const faqId = button.getAttribute('data-faq-id');
      const confirmed = confirm('Are you sure you want to delete this FAQ?');
      
      if (confirmed) {
        await deleteFAQ(faqId);
        const updatedFaqs = await fetchFAQs();
        renderFAQs(updatedFaqs);
      }
    });
  });
}

export async function addFAQ(question, answer) {
  const faqsRef = collection(db, "faqs");
  await addDoc(faqsRef, {
    question: question,
    answer: answer
  });
}

export async function deleteFAQ(faqId) {
  try {
    const faqRef = doc(db, "faqs", faqId);
    await deleteDoc(faqRef);
    console.log("FAQ deleted successfully");
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    alert("Failed to delete FAQ. Please try again.");
  }
}

// Onboarding Documents Functions
export async function fetchOnboardingDocs() {
  const onboardingRef = collection(db, "onboarding");
  const snapshot = await getDocs(onboardingRef);
  const docs = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return docs;
}

export function renderOnboardingDocs(docs) {
  const onboardingContainer = document.getElementById('onboarding-container');
  onboardingContainer.innerHTML = '';
  
  docs.forEach(doc => {
    const details = document.createElement('details');
    details.classList.add('flex', 'flex-col', 'rounded-lg', 'border', 'border-[#dbe0e6]', 'bg-white', 'px-[15px]', 'py-[7px]', 'group');
    details.innerHTML = `
      <summary class="flex cursor-pointer items-center justify-between gap-6 py-2">
        <p class="text-[#111418] text-sm font-medium leading-normal">${doc.title}</p>
        <div class="flex items-center gap-2">
          <button 
            class="delete-onboarding-btn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition-colors duration-200" 
            data-doc-id="${doc.id}"
            onclick="event.preventDefault(); event.stopPropagation();"
          >
            Delete
          </button>
          <div class="text-[#111418] group-open:rotate-180" data-icon="CaretDown" data-size="20px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
              <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
            </svg>
          </div>
        </div>
      </summary>
      <p class="text-[#617589] text-sm font-normal leading-normal pb-2">${doc.description}</p>
    `;
    onboardingContainer.appendChild(details);
  });

  // Add event listeners to delete buttons
  const deleteButtons = document.querySelectorAll('.delete-onboarding-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const docId = button.getAttribute('data-doc-id');
      const confirmed = confirm('Are you sure you want to delete this onboarding document?');
      
      if (confirmed) {
        await deleteOnboardingDoc(docId);
        const updatedDocs = await fetchOnboardingDocs();
        renderOnboardingDocs(updatedDocs);
      }
    });
  });
}

export async function addOnboardingDoc(title, description) {
  const onboardingRef = collection(db, "onboarding");
  await addDoc(onboardingRef, {
    title: title,
    description: description
  });
}

export async function deleteOnboardingDoc(docId) {
  try {
    const docRef = doc(db, "onboarding", docId);
    await deleteDoc(docRef);
    console.log("Onboarding document deleted successfully");
  } catch (error) {
    console.error("Error deleting onboarding document:", error);
    alert("Failed to delete onboarding document. Please try again.");
  }
}