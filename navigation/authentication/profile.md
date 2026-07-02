---
layout: base
title: Profile Settings
permalink: /profile
search_exclude: true
---

<style>
    #profileImageBox img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 9999px;
    }

    #profileImageBox p {
        margin: 0;
        text-align: center;
        color: #64748b;
        font-size: 0.95rem;
        line-height: 1.6;
    }

    .dark #profileImageBox p {
        color: #94a3b8;
    }
</style>

<section class="mx-auto max-w-6xl space-y-8">
    <div class="max-w-3xl space-y-4">
        <span class="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary-700 dark:border-primary-900/60 dark:bg-primary-950/40 dark:text-primary-300">
            Account Center
        </span>
        <h1 class="max-w-2xl text-4xl sm:text-5xl">Manage Your Macro Cosmos Profile</h1>
        <p class="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Update your public account details, rotate credentials, and keep your profile photo current without leaving the dashboard.
        </p>
    </div>

    <!-- Two-Factor Authentication via Passkeys — shown at the TOP so it's seen first -->
    <section class="rounded-[2rem] border border-slate-200/70 bg-white/80 p-8 shadow-medium backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/70">
        <h2 class="text-2xl font-semibold text-slate-900 dark:text-white">Two-Factor Authentication (Passkeys)</h2>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Secure your account and sign in without a password using Face&nbsp;ID, Touch&nbsp;ID, Windows&nbsp;Hello, or a security key. A passkey is your second factor — no authenticator app or codes needed.</p>
        <p id="passkey-required" class="hidden mt-4 text-sm font-semibold text-rose-600 dark:text-rose-400"></p>
        <div id="passkey-list" class="mt-4 space-y-2"></div>
        <button type="button" onclick="addPasskey()" class="mt-4 rounded-xl bg-slate-900 px-5 py-2.5 text-white font-semibold hover:bg-slate-800 dark:bg-primary-600 dark:hover:bg-primary-500">+ Add a passkey</button>
        <p id="passkey-message" class="mt-3 min-h-5 text-sm font-medium"></p>

        <!-- Recovery backup codes -->
        <div class="mt-6 border-t border-slate-200 dark:border-slate-700 pt-5">
            <h3 class="text-base font-semibold text-slate-800 dark:text-slate-200">Recovery backup codes</h3>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">One-time codes to sign in if you ever lose your passkey device. <span id="backup-remaining" class="font-medium"></span></p>
            <div id="backup-codes-box" class="hidden mt-3 grid grid-cols-2 gap-2 rounded-xl bg-slate-900 p-4 font-mono text-sm text-slate-100"></div>
            <p id="backup-save-warning" class="hidden mt-2 text-xs font-semibold text-amber-600 dark:text-amber-400">Save these now — they won't be shown again, and each works only once.</p>
            <button type="button" onclick="generateBackupCodes()" class="mt-3 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold hover:border-primary-500 dark:border-slate-600">Generate backup codes</button>
            <p id="backup-message" class="mt-2 min-h-5 text-sm font-medium"></p>
        </div>
    </section>

    <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <aside class="rounded-[2rem] border border-slate-200/70 bg-white/80 p-8 shadow-medium backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/70">
            <div class="space-y-6">
                <div>
                    <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Profile Photo</p>
                    <h2 class="mt-3 text-3xl">Your Account Identity</h2>
                    <p class="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        Use a clear profile image so your account is recognizable across saved routes, reports, and subscription tools.
                    </p>
                </div>

                <div class="rounded-[1.75rem] border border-slate-200/70 bg-slate-50/80 p-6 dark:border-slate-700/60 dark:bg-slate-950/40">
                    <div id="profileImageBox" class="mx-auto flex h-52 w-52 items-center justify-center overflow-hidden rounded-full border border-dashed border-slate-300 bg-white p-3 shadow-soft dark:border-slate-700 dark:bg-slate-900">
                        <p>No profile picture available.</p>
                    </div>

                    <input type="file" id="profilePicture" class="sr-only" accept="image/*" onchange="saveProfilePicture()">

                    <label for="profilePicture" class="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-700 transition hover:border-primary-400 hover:text-primary-700 hover:shadow-soft dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-primary-500 dark:hover:text-primary-300">
                        <i class="fas fa-upload"></i>
                        Upload Profile Picture
                    </label>

                    <p id="profile-message" class="mt-4 min-h-6 text-sm font-medium text-rose-600 dark:text-rose-400"></p>
                </div>

                <div class="rounded-[1.5rem] border border-slate-200/70 bg-slate-50/80 p-6 dark:border-slate-700/60 dark:bg-slate-950/40">
                    <h3 class="text-xl">Before You Update</h3>
                    <ul class="mt-4 space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        <li>Changing your username or password signs you out immediately.</li>
                        <li>Name updates apply to the visible account label in the shared shell.</li>
                        <li>Your current values are loaded into the field placeholders when available.</li>
                    </ul>
                </div>
            </div>
        </aside>

        <section class="rounded-[2rem] border border-slate-200/70 bg-white/80 p-8 shadow-medium backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/70">
            <div class="space-y-3">
                <p class="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Account Details</p>
                <h2 class="text-3xl">Security And Identity</h2>
                <p class="text-sm leading-7 text-slate-600 dark:text-slate-300">
                    Each field saves on change, so only update the values you intend to replace.
                </p>
            </div>

            <form class="mt-8 grid gap-6">
                <div class="rounded-[1.5rem] border border-slate-200/70 bg-slate-50/70 p-6 dark:border-slate-700/60 dark:bg-slate-950/30">
                    <label for="newUid" class="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Username</label>
                    <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Update the unique ID you use to sign in.</p>
                    <input type="text" id="newUid" placeholder="New username" class="mt-4 w-full" autocomplete="username">
                    <p id="uid-message" class="mt-3 min-h-5 text-sm font-medium text-rose-600 dark:text-rose-400"></p>
                </div>

                <div class="rounded-[1.5rem] border border-slate-200/70 bg-slate-50/70 p-6 dark:border-slate-700/60 dark:bg-slate-950/30">
                    <label for="newName" class="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Display Name</label>
                    <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Control how your account appears in shared navigation and profile surfaces.</p>
                    <input type="text" id="newName" placeholder="New display name" class="mt-4 w-full" autocomplete="name">
                    <p id="name-message" class="mt-3 min-h-5 text-sm font-medium text-rose-600 dark:text-rose-400"></p>
                </div>

                <div class="rounded-[1.5rem] border border-slate-200/70 bg-slate-50/70 p-6 dark:border-slate-700/60 dark:bg-slate-950/30">
                    <label for="newPassword" class="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Password</label>
                    <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Choose a fresh password if you need to rotate credentials.</p>
                    <input type="password" id="newPassword" placeholder="New password" class="mt-4 w-full" autocomplete="new-password">
                    <p id="password-message" class="mt-3 min-h-5 text-sm font-medium text-rose-600 dark:text-rose-400"></p>
                </div>
            </form>

            <div class="mt-8 hidden" aria-hidden="true">
                <table class="w-full">
                    <tbody id="profileResult"></tbody>
                </table>
            </div>
        </section>
    </div>
</section>

<script type="module">
// Import fetchOptions from config.js
import {pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
// Import functions from config.js
import { putUpdate, postUpdate, deleteData, logoutUser } from "{{site.baseurl}}/assets/js/api/profile.js";
import { startRegistration } from 'https://cdn.jsdelivr.net/npm/@simplewebauthn/browser@10.0.0/+esm';

// ===== Passkeys (WebAuthn / biometric) =====
async function loadPasskeys() {
    const list = document.getElementById('passkey-list');
    if (!list) return;
    try {
        const r = await fetch(`${pythonURI}/api/webauthn/credentials`, fetchOptions);
        const items = r.ok ? await r.json() : [];
        if (!items.length) { list.innerHTML = '<p class="text-sm text-slate-500">No passkeys yet.</p>'; return; }
        list.innerHTML = items.map(p => `
            <div class="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2">
                <span class="text-sm text-slate-700 dark:text-slate-200">${(p.name || 'Passkey')} <span class="text-xs text-slate-400">· added ${(p.created_at || '').slice(0, 10)}</span></span>
                <button type="button" onclick="removePasskey(${p.id})" class="text-xs font-semibold text-rose-500 hover:text-rose-600">Remove</button>
            </div>`).join('');
    } catch (e) { /* ignore */ }
}
window.addPasskey = async function () {
    const msg = document.getElementById('passkey-message'); msg.textContent = '';
    // WebAuthn forbids IP addresses (e.g. 127.0.0.1) as a relying-party domain.
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(location.hostname)) {
        msg.className = 'mt-3 text-sm font-medium text-rose-500';
        msg.textContent = "Passkeys need 'localhost' or a real domain — open this site at http://localhost (not an IP address) to use passkeys.";
        return;
    }
    try {
        const beginR = await fetch(`${pythonURI}/api/webauthn/register/begin`, { ...fetchOptions, method: 'POST' });
        const options = await beginR.json();
        if (!beginR.ok) throw new Error(options.error || 'Could not start passkey setup');
        const challengeToken = options.challengeToken; // stateless challenge (works cross-origin)
        const attestation = await startRegistration(options); // triggers the biometric/security-key prompt
        const compR = await fetch(`${pythonURI}/api/webauthn/register/complete`, {
            ...fetchOptions, method: 'POST', body: JSON.stringify({ credential: attestation, name: 'Passkey', challenge_token: challengeToken })
        });
        const data = await compR.json();
        if (!compR.ok) throw new Error(data.error || 'Passkey registration failed');
        msg.className = 'mt-3 text-sm font-medium text-emerald-500'; msg.textContent = 'Passkey added! This is your 2FA. Tip: generate backup codes below so you never get locked out.';
        loadPasskeys();
        refreshMfaStatus();
        refreshBackupStatus();
        // If we were sent here for forced 2FA setup, continue into the app now.
        if (new URLSearchParams(location.search).get('mfa') === 'required') {
            msg.textContent = "Passkey added — you're all set! Taking you into the app…";
            setTimeout(() => { window.location.href = "{{site.baseurl}}/"; }, 1400);
        }
    } catch (e) {
        msg.className = 'mt-3 text-sm font-medium text-rose-500';
        msg.textContent = (e && e.message) ? e.message : 'Passkey setup was cancelled.';
    }
};
window.removePasskey = async function (id) {
    if (!window.confirm('Remove this passkey?')) return;
    try {
        await fetch(`${pythonURI}/api/webauthn/credentials/${id}`, { ...fetchOptions, method: 'DELETE' });
        loadPasskeys();
        refreshMfaStatus();
    } catch (e) { /* ignore */ }
};

// ===== Recovery backup codes =====
async function refreshBackupStatus() {
    const el = document.getElementById('backup-remaining');
    if (!el) return;
    try {
        const r = await fetch(`${pythonURI}/api/mfa/backup-codes`, fetchOptions);
        if (r.ok) {
            const d = await r.json();
            el.textContent = d.remaining > 0 ? `You have ${d.remaining} unused code(s).` : 'None generated yet.';
        }
    } catch (e) { /* ignore */ }
}
window.generateBackupCodes = async function () {
    const msg = document.getElementById('backup-message'); msg.textContent = '';
    if (!window.confirm('Generate new backup codes? This replaces any existing ones.')) return;
    try {
        const r = await fetch(`${pythonURI}/api/mfa/backup-codes`, { ...fetchOptions, method: 'POST' });
        const d = await r.json();
        if (!r.ok) throw new Error(d.error || 'Could not generate codes');
        const box = document.getElementById('backup-codes-box');
        box.innerHTML = d.codes.map(c => `<span>${c}</span>`).join('');
        box.classList.remove('hidden');
        document.getElementById('backup-save-warning').classList.remove('hidden');
        refreshBackupStatus();
    } catch (e) { msg.className = 'mt-2 text-sm font-medium text-rose-500'; msg.textContent = e.message; }
};
refreshBackupStatus();
loadPasskeys();

// ===== 2FA status (passkey-based) — drives the "2FA required" banner =====
// 2FA is now satisfied by a passkey; there is no authenticator-app step.
let mfaEnforced = false;  // true when this account must set up 2FA before leaving
async function refreshMfaStatus() {
    const banner = document.getElementById('passkey-required');
    if (!banner) return;
    try {
        const r = await fetch(`${pythonURI}/api/mfa/status`, fetchOptions);
        if (!r.ok) { banner.classList.add('hidden'); mfaEnforced = false; return; }
        const s = await r.json();
        mfaEnforced = !!s.required;
        if (s.required) {
            banner.textContent = '⚠️ Two-factor authentication is REQUIRED for your account — add a passkey below.';
            banner.classList.remove('hidden');
        } else {
            banner.classList.add('hidden');
        }
    } catch (e) { /* ignore */ }
}
refreshMfaStatus();

// Block navigation away from this page until 2FA is set up, with an alert.
document.addEventListener('click', (e) => {
    if (!mfaEnforced) return;
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    // Allow staying on the profile page, anchor jumps, and logging out.
    if (href.startsWith('#') || href.includes('/profile') || href.includes('/logout')) return;
    e.preventDefault();
    e.stopPropagation();
    alert('You need to set up two-factor authentication first. Add a passkey on this page before continuing — it is required for your account.');
}, true);

// Function to update table with fetched data
function updateTableWithData(data) {
   const tableBody = document.getElementById('profileResult');
   if (!tableBody) {
       return;
   }
   tableBody.innerHTML = '';

   data.sections.forEach((section, index) => {
       const tr = document.createElement('tr');
       const themeCell = document.createElement('td');
       const nameCell = document.createElement('td');
       const yearCell = document.createElement('td');

       themeCell.textContent = section.theme;
       nameCell.textContent = section.name;

       const trashIcon = document.createElement('i');
       trashIcon.className = 'fas fa-trash-alt trash-icon';
       trashIcon.style.marginLeft = '10px';
       themeCell.appendChild(trashIcon);

       trashIcon.addEventListener('click', async function (event) {
           event.preventDefault();
           const URL = pythonURI + "/api/user/section";
           // Remove the row from the table
           tr.remove();

           const options = {
               URL,
               body: { sections: [section.theme] },
               message: 'profile-message',
           };

           try {
               await deleteData(options);
           } catch (error) {
               console.error('Error deleting section:', error.message);
               document.getElementById('profile-message').textContent = 'Error deleting section: ' + error.message;
           }
       });

      yearCell.classList.add('editable'); // Make year cell editable
      yearCell.innerHTML = `${section.year} <i class="fas fa-pencil-alt edit-icon" style="margin-left: 10px;"></i>`;

       // Make the year cell editable
       yearCell.addEventListener('click', function () {
           const input = document.createElement('input');
           input.type = 'text';
           input.value = section.year;
           input.className = 'edit-input';
           yearCell.innerHTML = '';
           yearCell.appendChild(input);

           input.focus();

           input.addEventListener('blur', async function () {
               const newYear = input.value;
               const URL = pythonURI + "/api/user/section";
               const options = {
                   URL,
                   body: { section: { theme: section.theme, year: newYear } },
                   message: 'profile-message',
               };

               try {
                   await putUpdate(options);
               } catch (error) {
                   console.error('Error updating year:', error.message);
                   document.getElementById('profile-message').textContent = 'Error updating year: ' + error.message;
               }

               yearCell.textContent = newYear;
           });

           input.addEventListener('keydown', function (event) {
               if (event.key === 'Enter') {
                   input.blur();
               }
           });
       });
       tr.appendChild(themeCell);
       tr.appendChild(nameCell);
       tr.appendChild(yearCell);

       tableBody.appendChild(tr);
   });

}

// Function to fetch user profile data
async function fetchUserProfile() {
    const URL = pythonURI + "/api/id/pfp"; // Endpoint to fetch user profile data

    try {
        const response = await fetch(URL, fetchOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch user profile: ${response.status}`);
        }

        const profileData = await response.json();
        displayUserProfile(profileData);
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        // Handle error display or fallback mechanism
    }
}

// Function to display user profile data
function displayUserProfile(profileData) {
    const profileImageBox = document.getElementById('profileImageBox');
    if (profileData.pfp) {
        const img = document.createElement('img');
        img.src = `data:image/jpeg;base64,${profileData.pfp}`;
        img.alt = 'Profile Picture';
        profileImageBox.innerHTML = ''; // Clear existing content
        profileImageBox.appendChild(img); // Append new image element
    } else {
        profileImageBox.innerHTML = '<p>No profile picture available.</p>';
    }

    // Display other profile information as needed
    // Example: Update HTML elements with profileData.username, profileData.email
}

// Function to save profile picture
window.saveProfilePicture = async function () {

    const fileInput = document.getElementById('profilePicture');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            const profileImageBox = document.getElementById('profileImageBox');
            profileImageBox.innerHTML = `<img src="${reader.result}" alt="Profile Picture">`;
        };
        reader.readAsDataURL(file);
    }

    if (!file) return;

    try {
        const base64String = await convertToBase64(file);
        await sendProfilePicture(base64String);
        console.log('Profile picture uploaded successfully!');

    } catch (error) {
        console.error('Error uploading profile picture:', error.message);
        // Handle error display or fallback mechanism
    }
}

// Function to convert file to base64
async function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]); // Remove the prefix part of the result
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

// Function to send profile picture to server
async function sendProfilePicture(base64String) {
   const URL = pythonURI + "/api/id/pfp"; // Adjust endpoint as needed

   // Create options object for PUT request
   const options = {
       URL,
       body: { pfp: base64String },
       message: 'profile-message', // Adjust the message area as needed
       callback: () => {
           console.log('Profile picture uploaded successfully!');
           // Handle success response as needed
       }
   };

   try {
       await putUpdate(options);
   } catch (error) {
       console.error('Error uploading profile picture:', error.message);
       document.getElementById('profile-message').textContent = 'Error uploading profile picture: ' + error.message;
   }
}
  // Function to update UI with new UID and change placeholder
window.updateUidField = function(newUid) {
  const uidInput = document.getElementById('newUid');
  uidInput.value = newUid;
  uidInput.placeholder = newUid;
}

// Function to update UI with new Name and change placeholder
window.updateNameField = function(newName) {
  const nameInput = document.getElementById('newName');
  nameInput.value = newName;
  nameInput.placeholder = newName;
}

// Function to change UID
window.changeUid = async function(uid) {
   if (uid) {
       const URL = pythonURI + "/api/user"; // Adjusted endpoint

       const options = {
           URL,
           body: { uid },
           message: 'uid-message', // Adjust the message area as needed
           callback: () => {
               alert("You updated your Github ID, so you will automatically be logged out. Be sure to remember your new github id to log in!");
               console.log('UID updated successfully!');
               window.updateUidField(uid);
               window.location.href = '{{site.baseurl}}/login'
           }
       };

       try {
           await putUpdate(options);
       } catch (error) {
           console.error('Error updating UID:', error.message);
           document.getElementById('uid-message').textContent = 'Error updating UID: ' + error.message;
       }
   }
}

window.changePassword = async function(password) {
   if (password) {
       const URL = pythonURI + "/api/user"; // Adjusted endpoint

       const options = {
           URL,
           body: { password },
           message: 'password-message', // Adjust the message area as needed
           callback: () => {
               console.log('Password updated successfully!');
               window.location.href = '{{site.baseurl}}/login'

           }
       };

       try {
            alert("You updated your password, so you will automatically be logged out. Be sure to remember your password!");
           await putUpdate(options);
           await logoutUser();
       } catch (error) {
           console.error('Error updating password:', error.message);
           document.getElementById('password-message').textContent = 'Error updating password: ' + error.message;
       }
   }
}

// Function to change Name
window.changeName = async function(name) {
   if (name) {
       const URL = pythonURI + "/api/user";
       const options = {
           URL,
           body: { name },
           message: 'name-message',
           callback: () => {
               console.log('Name updated successfully!');
               window.updateNameField(name);
           }
       };
       try {
           await putUpdate(options);
       } catch (error) {
           console.error('Error updating Name:', error.message);
           document.getElementById('name-message').textContent = 'Error updating Name: ' + error.message;
       }
   }
}

// Event listener to trigger updateUid function when UID field is changed
document.getElementById('newUid').addEventListener('change', function() {
    const uid = this.value;
    window.changeUid(uid);

});

// Event listener to trigger updateName function when Name field is changed
document.getElementById('newName').addEventListener('change', function() {
    const name = this.value;
    window.changeName(name);

});

document.getElementById('newPassword').addEventListener('change', function() {
    const password = this.value;
    window.changePassword(password);

});

// Function to fetch Name from backend
window.fetchUid = async function() {
    const URL = pythonURI + "/api/user";

    try {
        const response = await fetch(URL, fetchOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch UID: ${response.status}`);
        }

        const data = await response.json();
        return data.uid;
    } catch (error) {
        console.error('Error fetching UID:', error.message);
        return null;
    }
};

window.fetchName = async function() {
    const URL = pythonURI + "/api/user"; // Adjusted endpoint

    try {
        const response = await fetch(URL, fetchOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch Name: ${response.status}`);
        }

        const data = await response.json();
        return data.name;
    } catch (error) {
        console.error('Error fetching Name:', error.message);
        return null;
    }
};

// Function to set placeholders for UID and Name
window.setPlaceholders = async function() {
    const uidInput = document.getElementById('newUid');
    const nameInput = document.getElementById('newName');

    try {
        const uid = await window.fetchUid();
        const name = await window.fetchName();

        if (uid !== null) {
            uidInput.placeholder = uid;
        }
        if (name !== null) {
            nameInput.placeholder = name;
        }
    } catch (error) {
        console.error('Error setting placeholders:', error.message);
    }
};

// Call and initializeProfileSetup when DOM content is loaded
document.addEventListener('DOMContentLoaded', async function () {
    try {
        await fetchUserProfile(); // Fetch user profile data
        await setPlaceholders();
    } catch (error) {
        console.error('Initialization error:', error.message);
        // Handle initialization error gracefully
    }
});

</script>
