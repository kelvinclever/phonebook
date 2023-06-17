import {Router} from "express"
import { assignGroup, deleteContact, getContact, getContacts, newContact, updateContact } from "../controllers/controllers.js"
import { verifyToken } from "../middleware/authenticateroutes.js"
export const contactRouter = Router()


contactRouter.get("/",verifyToken,getContacts)
contactRouter.get("/:id",verifyToken,getContact)
contactRouter.post("/new",verifyToken,newContact)
contactRouter.put("/:id/update", updateContact)
contactRouter.delete("/:id/delete", deleteContact)
contactRouter.patch("/:contactid/assigngroup/:groupname", assignGroup)


