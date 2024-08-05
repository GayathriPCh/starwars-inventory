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
import Link from 'next/link';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#f8f9fa',
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
  background: 'linear-gradient(to bottom right, #d4a5a5, #ffffff)',
  color: '#fff',
}

const buttonStyles = {
  add: {
    background: 'linear-gradient(to right, #a8dadc, #457b9d)',
    color: '#fff',
  },
  remove: {
    background: 'linear-gradient(to right, #ff6b6b, #f07b7b)',
    color: '#fff',
  },
  update: {
    background: 'linear-gradient(to right, #ffe066, #f9ed69)',
    color: '#000',
  },
  generate: {
    background: 'linear-gradient(to right, #b9fbc0, #6d9dc5)', // Pastel gradient
    color: '#000',
  },
}

const searchBarStyles = {
  backgroundColor: '#f1f1f1',
  color: '#000',
  border: '1px solid #fff',
  '& .MuiInputBase-input::placeholder': {
    color: '#000',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ddd',
    },
    '&:hover fieldset': {
      borderColor: '#ddd',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ddd',
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
        backgroundImage: 'url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eae8a3eb-7b8f-4680-a177-64afc2f067b3/dgyjeju-ef2ff01a-35c6-41cd-b9ad-35c1f4daa717.jpg/v1/fit/w_828,h_464,q_70,strp/chihiro_and_haku_by_elka0815_dgyjeju-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzE4IiwicGF0aCI6IlwvZlwvZWFlOGEzZWItN2I4Zi00NjgwLWExNzctNjRhZmMyZjA2N2IzXC9kZ3lqZWp1LWVmMmZmMDFhLTM1YzYtNDFjZC1iOWFkLTM1YzFmNGRhYTcxNy5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.Lw-0pJGS2UkaDMVO5rfE0nfpbLuCkCe0r_nGUkmWKWg)',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
    > <Typography variant="h2" component="div" sx={{ color: '#fff', mb: 2 }}>
    DragonScribe
  </Typography>
  <Button
    variant="contained"
    sx={buttonStyles.generate}
    component={Link}
    href="/symbolism-explorer"
  >
    Generate Story
  </Button>
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
