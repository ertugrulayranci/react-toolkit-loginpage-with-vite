

import { createContext, useState } from "react";

/**
 * Her context'in mutlaka herhangi bir değer ile initialize edilmesi gerekiyor.
 * Bunu istersek `createContext()` fonksiyonuna doğrudan boş obje olarak gönderebiliriz,
 * istersek aşağıdaki gibi yeni bir değişken oluşturarak gönderebiliriz.
 */
const initialValue = {};

/**
 * Bir değişkenin JSX elemanı olarak kullanılabilemesi için ilk harfinin
 * büyük olma zorunluluğu vardır.
 */
export const AuthTokenContext = createContext(initialValue);

export default function AuthTokenContextProvider(props) {
  const [token, setToken] = useState(null);

  const contextValue = {
    token,
    setToken,
  };

  return (
    <AuthTokenContext.Provider value={contextValue}>
      {props.children}
    </AuthTokenContext.Provider>
  );
}
