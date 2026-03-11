package middleware

import (
	"fmt"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
)

var secretKey = []byte("4QTJJHPLH3")

func JWTMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		// Ambil token dari header Authorization
		tokenString := c.Request().Header.Get("Authorization")
		if tokenString == "" {
			return c.JSON(http.StatusUnauthorized, map[string]string{"message": "Token is missing"})
		}

		// Token diawali dengan "Bearer ", kita ambil bagian setelahnya
		if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
			tokenString = tokenString[7:]
		} else {
			return c.JSON(http.StatusUnauthorized, map[string]string{"message": "Invalid token format"})
		}

		// Verifikasi token menggunakan jwt-go
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			// Pastikan signing method-nya adalah HMAC
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
			}
			// Kembalikan secret key untuk verifikasi token
			return secretKey, nil
		})

		// Jika ada error atau token tidak valid
		if err != nil || !token.Valid {
			return c.JSON(http.StatusUnauthorized, map[string]string{"message": "Invalid token"})
		}
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok || claims["id_user"] == nil {
			return c.JSON(http.StatusUnauthorized, map[string]string{"message": "Invalid token claims"})
		}
		fmt.Println(claims)
		// Ambil user_id dari klaim dan simpan di context
		userID := int(claims["id_user"].(float64)) // Jika user_id bertipe int
		// Jika user_id adalah string, gunakan claims["user_id"].(string)

		// Menyimpan user_id ke dalam context untuk diteruskan ke handler
		c.Set("id_user", userID)
		// Token valid, lanjutkan ke handler berikutnya
		return next(c)
	}
}

func GenerateJWT(username string, id int) (string, error) {
	// Buat klaim (claim) untuk token
	claims := jwt.MapClaims{
		"id_user":  id,
		"username": username,                              // Klaim bisa berupa data yang ingin dimasukkan
		"exp":      time.Now().Add(time.Hour * 24).Unix(), // Kadaluarsa dalam 72 jam
	}

	// Buat token dengan klaim tersebut dan sign menggunakan secret key
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Sign token dan kembalikan string token
	return token.SignedString(secretKey)
}
