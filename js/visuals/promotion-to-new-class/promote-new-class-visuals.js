const visualizePromoteToNewClass = (newClass) => {
  const playerareaEle = document.getElementById("player-area-box");

  const newContainerEle = document.createElement("div");
  const newCongratsTextEle = document.createElement("div");
  const newClassTextEle = document.createElement("div");

  newContainerEle.id = "promotion-class-popup-container";
  newCongratsTextEle.id = "promotion-class-popup-congrats-text";
  newClassTextEle.id = "promotion-class-popup-class-text";

  newCongratsTextEle.innerText = "You are promoted to a new class!";
  newClassTextEle.innerText = newClass;

  newContainerEle.appendChild(newCongratsTextEle);
  newContainerEle.appendChild(newClassTextEle);
  playerareaEle.appendChild(newContainerEle);

  newContainerEle.onclick = () => {
    playerareaEle.removeChild(newContainerEle);
  };
};
