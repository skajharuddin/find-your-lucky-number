// Fake hacking prank. Nothing real happens: it only prints text.
const $ = (id) => document.getElementById(id);
const LINES = [
  'Connecting to secret server... (গোপন সার্ভারে কানেক্ট করা হচ্ছে...)',
  'Bypassing firewall... (ফায়ারওয়াল ভেঙে ঢোকা হচ্ছে...)',
  'Hacking your Facebook... (তোমার ফেসবুক হ্যাক করা হচ্ছে...)',
  'Reading your secret chats... (তোমার গোপন চ্যাট পড়া হচ্ছে...)',
  'Stealing your selfies... (তোমার সেলফিগুলো চুরি হচ্ছে...)',
  'Checking your search history... (তোমার সার্চ হিস্ট্রি দেখা হচ্ছে...)',
  'Downloading all your memes... (তোমার সব মিম ডাউনলোড হচ্ছে...)',
  "Changing your WiFi name to 'Free Biryani'... (তোমার ওয়াইফাইয়ের নাম বদলে 'ফ্রি বিরিয়ানি' করা হচ্ছে...)",
  'Sending your crush a message... (তোমার ক্রাশকে মেসেজ পাঠানো হচ্ছে...)',
  "Almost done, don't blink! (প্রায় শেষ, পলক ফেলো না!)",
];
let timer;

function add(text, cls) {
  document
    .querySelectorAll('#log .cur')
    .forEach((e) => e.classList.remove('cur'));
  const p = document.createElement('p');
  p.textContent = text;
  p.className = (cls || '') + ' cur';
  $('log').append(p);
}

function run(name) {
  let i = 0;
  (function next() {
    if (i < LINES.length) {
      add(LINES[i++]);
      timer = setTimeout(next, 1000 + Math.random() * 1000); // 1-2 sec gap
    } else {
      add(
        `Congratulations ${name}, everything has been hacked! (অভিনন্দন ${name}, সবকিছু হ্যাক হয়ে গেছে!)`,
        'last',
      );
      $('note').hidden = false;
      $('again').hidden = false;
    }
  })();
}

function start() {
  const name = $('name').value.trim();
  if (!name) {
    $('name').focus();
    return;
  }
  document.body.classList.add('hack');
  $('home').hidden = true;
  $('term').hidden = false;
  run(name);
}

$('go').onclick = start;
$('name').onkeydown = (e) => {
  if (e.key === 'Enter') start();
};
$('again').onclick = () => {
  clearTimeout(timer);
  $('log').replaceChildren();
  $('note').hidden = true;
  $('again').hidden = true;
  $('term').hidden = true;
  document.body.classList.remove('hack');
  $('home').hidden = false;
  $('name').value = '';
  $('name').focus();
};
