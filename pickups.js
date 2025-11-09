const PICKUPS_JSON = './pickups.json'; // path to JSON
let currentAudio = null;

async function fetchPickups() {
  try {
    const response = await fetch(PICKUPS_JSON);
    if (!response.ok) throw new Error(`Network error: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error('Failed to fetch pickups:', err);
    return [];
  }
}

// Create a card-like figure with two images and a caption
function createButton(pickup) {
  // Create container
  const figure = document.createElement('figure');
  figure.className = 'pickup-figure';

  // Caption
  const caption = document.createElement('figcaption');
  caption.textContent = pickup.name || 'Unnamed pickup';
  figure.appendChild(caption);

  // Ensure we have an images array (avoid crash if JSON missing images)
  const images = Array.isArray(pickup.images) ? pickup.images : [];

  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = pickup.name || 'pickup image';
    img.className = 'pickup-image';

    // Click handler (play/pause logic)
    img.addEventListener('click', () => {
      try {
        // Pause a different audio if it's playing
        if (currentAudio && !currentAudio.paused && !currentAudio.src.endsWith(pickup.audio)) {
          currentAudio.pause();
        }

        // If same audio is playing, pause it (toggle)
        if (currentAudio && currentAudio.src.endsWith(pickup.audio) && !currentAudio.paused) {
          currentAudio.pause();
          return;
        }

        // If switching or first time, create and play
        if (!currentAudio || !currentAudio.src.endsWith(pickup.audio)) {
          currentAudio = new Audio(pickup.audio);
          currentAudio.play().catch(err => console.error('Playback failed:', err));
        } else {
          // same audio but currently paused -> toggle play/pause
          currentAudio.paused ? currentAudio.play() : currentAudio.pause();
        }
      } catch (err) {
        console.error('Error in click handler:', err);
      }
    });

    // Append the image to the figure (outside the click handler)
    figure.appendChild(img);
  });

  return figure; // return the element we created
}

async function renderPickups() {
  const container = document.getElementById('pickupButtons');
  if (!container) {
    console.error('Missing container: <div id="pickupButtons"></div>');
    return;
  }

  container.innerHTML = 'Loading…';
  const pickups = await fetchPickups();
  container.innerHTML = '';

  if (!pickups.length) {
    container.textContent = 'No pickups available.';
    return;
  }

  pickups.forEach(p => {
    const card = createButton(p);
    container.appendChild(card);
  });
}

window.addEventListener('DOMContentLoaded', renderPickups);
// i love you
