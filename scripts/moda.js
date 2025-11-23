const modal = document.querySelector('#myModal');
const closeModal = document.querySelector('#closeModal');
modal.showModal(); // display the modal dialog right away.
// Usually you will want to wait for a user action to show the modal dialog
closeModal.addEventListener('click', () => {
  modal.close();
});


function displayCourseDetails(course) {
  courseDetails.innerHTML = '';
  courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
  `;
  courseDetails.showModal();
  
  closeModal.addEventListener("click", () => {
    courseDetails.close();
  });
}