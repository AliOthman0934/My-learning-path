let messages = [{
  id: 1,
  name: "Ali",
  message: "Hey there, Ali is here"
},
{
  id: 2,
  name: "Carmen",
  message: "Hey there, Carmen is here"
}
];



export const getAllMessages = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: {
        message: messages
      }
    })
  } catch (e) {
    console.log(e);
    res.json({
      status: "fail",
      message: "Somthing went wrong"
    })

  }
};

export const sendMessage = async (req, res) => {
  try {
    const lastIndexIdMessage = messages[messages.length - 1].id + 1;
    const newMessage = Object.assign({ id: lastIndexIdMessage }, req.body);

    messages.push(newMessage);
    res.status(201).json({
      status: "success",
      data: {
        message: newMessage
      }
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
      message: "Somthing went wrong"
    });
  }
};


export const updateMessage = async (req, res) => {
  try {
    const id = +req.params.id;
    const messageToUpdate = messages.find(el => el.id === id);

    if (!messageToUpdate) {
      return res.status(400).json({
        status: "fail",
        message: `Message with ID ${id} not found`
      });
    }

    const index = messages.indexOf(messageToUpdate);
    Object.assign(messageToUpdate, req.body);

    messages[index] = messageToUpdate;

    res.status(200).json({
      status: "success",
      data: {
        message: messageToUpdate
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Somthing went wrong"
    });
  }
};


export const deleteMessage = async (req, res) => {
  try {
    const id = +req.params.id;
    const messageToDelete = messages.find(el => el.id === id);

    if (!messageToDelete) {
      return res.status(400).json({
        status: "fail",
        message: `Message with ID ${id} not found`
      });
    }

    const index = messages.indexOf(messageToDelete);
    messages.splice(index, 1);

    res.status(204).json({
      status: "success",
      data: {
        message: null
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      message: "Somthing went wrong"
    });
  }
};
