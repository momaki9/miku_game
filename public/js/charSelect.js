let btn = document.querySelectorAll('.char')

const selectCharacter = async (event) => {
  
    // Collect values from the login form
    const character_id = event.target.value
    console.log(character_id);
    if ( character_id) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/char/charuser', {
        method: 'POST',
        body: JSON.stringify({ character_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/home');
      } else {
        alert(response.statusText);
      }
    }
};


for (let index = 0; index < btn.length; index++) {
    btn[index].addEventListener('click', selectCharacter)
    
}
