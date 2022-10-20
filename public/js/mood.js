
const moodHandler = async (event) => {
    event.preventDefault();
    const user_id = event.target.getAttribute('data-id')
    let mood = parseInt(document.querySelector("#current-mood").textContent);
    mood++

    console.log(user_id)
    console.log(mood)
    // console.log(updatedMood)
  
    if (user_id && mood) {
      const response = await fetch(`/api/char/${user_id}`, {
        method: 'PUT',
        body: JSON.stringify({ mood }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.reload('/visit');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document.querySelector('#mood-btn').addEventListener('click', moodHandler);