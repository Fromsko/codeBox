package api

import (
	"codeBox/backend/config"
	"codeBox/backend/core"
)

func Update() {
	core.DownloadRepo(
		config.PROJECT,
		config.PROXY,
	)
}
