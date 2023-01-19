import express from 'express'
import { PermissionFlag } from './common.permissionflag.enum'
import debug from 'debug'

const log: debug.IDebugger = debug('app:common-permission-middleware')