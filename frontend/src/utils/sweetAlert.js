import Swal from 'sweetalert2'

export const confirmDeleteItem = async () =>
  Swal.fire({
    title: 'Delete Item?',
    text: 'Are you sure you want to delete this item? This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
  })

export const showDeleteSuccess = async () =>
  Swal.fire({
    icon: 'success',
    title: 'Deleted!',
    text: 'The item has been deleted successfully.',
    confirmButtonColor: '#3085d6',
  })

export const showDeleteError = async () =>
  Swal.fire({
    icon: 'error',
    title: 'Delete Failed',
    text: 'Unable to delete the item. Please try again.',
    confirmButtonColor: '#3085d6',
  })
