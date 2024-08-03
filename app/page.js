'use client'

import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField, InputAdornment, IconButton, Card, CardContent } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { firestore } from './firebase';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
  updateDoc,
} from 'firebase/firestore'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'rgba(0, 0, 0, 0.7)',
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

const cardStyle = {
  minWidth: 275,
  margin: '8px 0',
  background: 'linear-gradient(to bottom right, #6a0dad, #000000)',
  color: '#fff',
}

const buttonStyles = {
  add: {
    background: 'linear-gradient(to right, #00FF00, #004d00)',
    color: '#fff',
  },
  remove: {
    background: 'linear-gradient(to right, #FF6347, #b22a00)',
    color: '#fff',
  },
  update: {
    background: 'linear-gradient(to right, #FFFF00, #cccc00)',
    color: '#000',
  },
}

const searchBarStyles = {
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: '#fff',
  border: '1px solid #fff',
  '& .MuiInputBase-input::placeholder': {
    color: '#fff',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#fff',
    },
    '&:hover fieldset': {
      borderColor: '#fff',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#fff',
    },
  },
}

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredInventory, setFilteredInventory] = useState([])

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
    setFilteredInventory(inventoryList)
  }

  useEffect(() => {
    updateInventory()
  }, [])

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredInventory(inventory)
    } else {
      setFilteredInventory(inventory.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())))
    }
  }, [searchTerm, inventory])

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: 1 })
    }
    await updateInventory()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory()
  }

  const updateItem = async (item) => {
    const newQuantity = prompt('Enter new quantity:', '0')
    if (newQuantity !== null) {
      const docRef = doc(collection(firestore, 'inventory'), item)
      await setDoc(docRef, { quantity: parseInt(newQuantity, 10) })
      await updateInventory()
    }
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
      padding={2}
      sx={{
        backgroundImage: 'url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/59366613-7339-44b6-8e36-f4a4edf88ad1/dhugrys-915c4514-c2b0-4928-afb9-4e4c6b561e9c.png/v1/fit/w_828,h_466,q_70,strp/alien_world_discovery_by_devillivedcyn_dhugrys-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzU5MzY2NjEzLTczMzktNDRiNi04ZTM2LWY0YTRlZGY4OGFkMVwvZGh1Z3J5cy05MTVjNDUxNC1jMmIwLTQ5MjgtYWZiOS00ZTRjNmI1NjFlOWMucG5nIiwiaGVpZ2h0IjoiPD03MjAiLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS53YXRlcm1hcmsiXSwid21rIjp7InBhdGgiOiJcL3dtXC81OTM2NjYxMy03MzM5LTQ0YjYtOGUzNi1mNGE0ZWRmODhhZDFcL2RldmlsbGl2ZWRjeW4tNC5wbmciLCJvcGFjaXR5Ijo5NSwicHJvcG9ydGlvbnMiOjAuNDUsImdyYXZpdHkiOiJjZW50ZXIifX0.b0hHwHbQeMT_s7ZgwizdOoVLQWLoB9R4CaIX-NOCBSE)',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" color="#fff">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              InputProps={{
                sx: { color: '#fff', borderColor: '#fff' }
              }}
            />
            <Button
              variant="outlined"
              sx={buttonStyles.add}
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Box width="100%" maxWidth="800px" mb={2}>
        <TextField
          variant="outlined"
          placeholder="Search items..."
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            sx: searchBarStyles,
          }}
        />
      </Box>
      <Button variant="contained" sx={buttonStyles.add} onClick={handleOpen}>
        Add New Item
      </Button>
      <Box width="100%" maxWidth="800px">
        {filteredInventory.length > 0 ? (
          <Stack direction={'column'} spacing={2}>
            {filteredInventory.map(({ name, quantity }) => (
              <Card key={name} sx={cardStyle}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {name}
                  </Typography>
                  <Typography variant="body2">
                    Quantity: {quantity}
                  </Typography>
                  <Stack direction={'row'} spacing={1} mt={1}>
                    <Button
                      variant="contained"
                      sx={buttonStyles.add}
                      onClick={() => addItem(name)}
                    >
                      Add
                    </Button>
                    <Button
                      variant="contained"
                      sx={buttonStyles.remove}
                      onClick={() => removeItem(name)}
                    >
                      Remove
                    </Button>
                    <Button
                      variant="contained"
                      sx={buttonStyles.update}
                      onClick={() => updateItem(name)}
                    >
                      Update
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        ) : (
          <Typography color="#fff">No items found</Typography>
        )}
      </Box>
    </Box>
  )
}
