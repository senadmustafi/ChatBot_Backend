
import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import sleep from 'sleep-promise';
import prisma from './db.js';

const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = 3030



app.post('/chatme', async (req, res) => {
  try {
    const { message, parentId } = req.body;
    const assistantResponse = "I am your virtual assistant";

    console.log(message,parentId )

    if (!message) {
      return res.status(400).json({ error: 'User message is required.' });
    }

    if (parentId) {
      const parentChat = await prisma.chat.findUnique({
        where: { id: parentId },
      });

      if (!parentChat) {
        return res.status(400).json({ error: 'Invalid parentId.' });
      }
    }

    const userChat = await prisma.chat.create({
      data: {
        name: 'User',
        content: message,
        parentId: parentId , 
      },
    });


    await sleep(2000);

    
    const assistantChat = await prisma.chat.create({
      data: {
        name: 'Assistant',
        content: assistantResponse,
        parentId: userChat.parentId || userChat.id, 
      },
    });

  
    res.json({ answer: assistantResponse, userChatId: userChat.id });
  } catch (err) {
    console.error('Error updating the database:', err);
    res.status(500).send('Error accessing the database');
  }
});


  app.get('/chat-history', async (req, res) => {
    try {
      const userChats = await prisma.chat.findMany({
        where: {
          name: 'User',
          parentId: null, 
        },
        include: {
          children: true,
        },
      });
  
      const formattedChats = userChats.map(chat => ({
        title: chat.content, 
        history: [chat], 
      }));
      console.log("Sended")
      res.json(formattedChats);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Error accessing the database');
    }
  });
  
  

  app.delete('/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id)
      
      const chatsToDelete = await prisma.chat.findMany({
        where: { parentId: parseInt(id) },
      });
  
      if (chatsToDelete.length === 0) {
        return res.status(404).json({ error: 'No chat entries found with the given parentId.' });
      }
     
      chatsToDelete.push(await prisma.chat.findUnique({
        where: { id: parseInt(id) },
      }));

      await prisma.chat.deleteMany({
        where: { id: { in: chatsToDelete.map(chat => chat.id) } },
      });
      
  
      res.json({ message: 'Chat entries deleted successfully.' });
    } catch (err) {
      console.error('Error deleting chat entries:', err);
      res.status(500).send('Error deleting chat entries.');
    }
  });
  
   
  


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})