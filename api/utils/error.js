const error = (status, message) => {
  // yeni bir hata nesnesi oluştur
  const err = new Error();

  // hata nesnesşbş güncelle
  err.message = message;
  err.status = status;
  return err;
};

export default error;
