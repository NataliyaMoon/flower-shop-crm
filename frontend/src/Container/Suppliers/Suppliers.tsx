import AddSupplier from './AddSuppliers'
import {
  useDeleteSupplierMutation,
  useGetAllSuppliersQuery,
} from '../../Store/services/suppliers'
import { ISuppliers } from '../../interfaces/ISuppliers'
import { CustomError } from '../../interfaces/errors/CustomError'
import Modal from '../../Components/UI/Modal/Modal'
import {
  Alert,
  Container,
  Grid,
  Snackbar,
  Typography,
  List,
  ListSubheader,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  ThemeProvider,
} from '@mui/material'
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { GlobalTheme } from '../..'
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone'
import QueueTwoToneIcon from '@mui/icons-material/QueueTwoTone'
import MarkEmailReadTwoToneIcon from '@mui/icons-material/MarkEmailReadTwoTone'
import PermPhoneMsgTwoToneIcon from '@mui/icons-material/PermPhoneMsgTwoTone'
import SignpostTwoToneIcon from '@mui/icons-material/SignpostTwoTone'
import InsertCommentTwoToneIcon from '@mui/icons-material/InsertCommentTwoTone'
import PersonPinTwoToneIcon from '@mui/icons-material/PersonPinTwoTone'
import ExpandLessTwoToneIcon from '@mui/icons-material/ExpandLessTwoTone'
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone'
import Loading from '../../Components/UI/Loading/Loading'

const Suppliers = () => {
  const { data, isLoading, isError, error } = useGetAllSuppliersQuery()
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [deleteSupplier] = useDeleteSupplierMutation()
  const [deleteSupplierId, setDeleteSupplierId] = useState<number | null>(null)
  const [openItemId, setOpenItemId] = useState<number | null>(null)
  const [uncoverForm, setUncoverForm] = useState(false)
  const [supplierId, setSupplierId] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    setOpen(isError)
  }, [isError])

  const handleClose = () => {
    setOpen(false)
    setOpenModal(false)
  }

  const handleClick = (itemId: number) => {
    setOpenItemId(itemId === openItemId ? null : itemId)
  }

  const handleAddButtonClick = () => {
    setUncoverForm(!uncoverForm)
  }

  const handleDelete = async (supplierId: number): Promise<void> => {
    setDeleteSupplierId(supplierId)
    setOpenModal(true)
  }

  const handleConfirmDelete = async () => {
    if (deleteSupplierId) {
      try {
        const result = await deleteSupplier(deleteSupplierId)
        if ('error' in result && result.error) {
          setOpenModal(true)
          setOpen(true)
        } else {
          setOpenModal(false)
          setOpen(false)
        }
        setDeleteSupplierId(null)
       
      } catch (error) {
        setOpen(true)
      }
    }
  }

  if (isLoading) return <Loading/>

  return (
    <ThemeProvider theme={GlobalTheme}>
      <Container>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          sx={{
            background: 'linear-gradient(10deg,	#FFF8DC 10%,#d6d3ea 90%)',
            borderRadius: 2,
            color: 'black',
          }}
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              sx={{ textAlign: 'center' }}
            >
              <Typography variant="h2">База поставщиков</Typography>
            </ListSubheader>
          }
        >
          <ListItem>
            <ListItemButton onClick={handleAddButtonClick}>
              <ListItemIcon>
                <QueueTwoToneIcon sx={{ width: 35, height: 35 }} />
              </ListItemIcon>
              <Typography variant="h5">Поставщик</Typography>
            </ListItemButton>
          </ListItem>
          {uncoverForm && <AddSupplier />}
          {data &&
            data.map((supplier: ISuppliers) => {
              const isItemOpen = supplier.id === openItemId
              return (
                <Grid key={supplier.id}>
                  <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="error"
                      sx={{ width: '100%' }}
                    >
                      {(error as CustomError)?.data?.message}
                    </Alert>
                  </Snackbar>
                  <Modal
                    isOpen={openModal && deleteSupplierId === supplier.id}
                    onClose={handleClose}
                    title="Вы действительно хотите удалить этого поставщика?"
                    isLoading={isLoading}
                    actionButtonLabel="Удалить"
                    onActionButtonClick={handleConfirmDelete}
                  ></Modal>
                  <ListItemButton onClick={() => handleClick(supplier.id)}>
                    <ListItemIcon>
                      <PersonPinTwoToneIcon sx={{ width: 35, height: 35 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="h5" style={{ color: 'black' }}>
                          {supplier.name_supplier}
                        </Typography>
                      }
                    />
                    <IconButton
                      onClick={() => navigate(`/edit-supplier/${supplier.id}`)}
                      aria-label="settings"
                    >
                      <ModeEditTwoToneIcon sx={{ width: 35, height: 35 }} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(supplier.id)}
                      aria-label="settings"
                    >
                      <DeleteForeverTwoToneIcon
                        sx={{ width: 35, height: 35 }}
                      />
                    </IconButton>
                    {isItemOpen ? (
                      <ExpandLessTwoToneIcon
                        onClick={() => {
                          setSupplierId(0)
                        }}
                      />
                    ) : (
                      <ExpandMoreTwoToneIcon
                        onClick={() => {
                          setSupplierId(supplier.id)
                        }}
                      />
                    )}
                  </ListItemButton>
                  <Collapse
                    in={isItemOpen}
                    timeout="auto"
                    unmountOnExit
                    sx={{ backgroundColor: '#ddd5d3' }}
                  >
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText>
                          <MarkEmailReadTwoToneIcon />
                          {supplier.email}
                        </ListItemText>
                      </ListItemButton>
                    </List>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText>
                          <PermPhoneMsgTwoToneIcon />
                          {supplier.phone}
                        </ListItemText>
                      </ListItemButton>
                    </List>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText>
                          <SignpostTwoToneIcon />
                          {supplier.address}
                        </ListItemText>
                      </ListItemButton>
                    </List>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText>
                          <InsertCommentTwoToneIcon />
                          {supplier.comment}
                        </ListItemText>
                      </ListItemButton>
                    </List>
                  </Collapse>
                </Grid>
              )
            })}
        </List>
      </Container>
    </ThemeProvider>
  )
}

export default Suppliers
