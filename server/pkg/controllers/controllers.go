package controllers

import (
	"chips-generator/pkg/models"

	"github.com/gofiber/fiber/v2"
)

func HandleGetAppVersion(c *fiber.Ctx) error {
	versionNum := models.GetAppVersion()
	return c.JSON(versionNum)
}
