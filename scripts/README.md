# Googgle webp script

- Installed `brew install webp`.
- Set quality to 80% and export.
- `cwebp -q 80 input.jpg -o output.webp`

# Blur Image:

- Run
`base64 -i living-1-blur.jpg`

- Then Prefix with the MIME type:

data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...
data:image/webp;base64,UklGRuoBAABXRUJQVlA4IN4BAACQCQCdASouAB0APpE8mkiloyKhKrgMALASCWIAnTLtBZhaYbbNIq3W7TGQYIaL4hnBiKfwFr5RpLpJlkpOG4WtVap7J3CHZcLsDxyuQFyoWIfJXoQAAP7+hBTx2LLCxdpj6zoqdqR8o6I9r5beBle362clr1AEa+/Xkd59Mbr8yXTgSuGKVM3+Qb4+oMEwEjCa0Dh/6z1/O9mXjtzGLpGQTaN/AmnSXOl8noGi8hC8DTGHwKsjio+hj+Yr+TgZlzNjDLhSx97g/Uu1y3XVcmWxfiu/jDc7EwGnqk77kPfR1NbFTaQ+2a86ypqzFRSRFUcS24uNEDOS9wGWGpIKRX77+O/yAh1kkmBROzk+ZtKWuv+B3azWujMlwMdAncLKOoVDXla/lr5o0BDayAbSO4/iGJcZy96N8flOY01q712FQw3iLG8xwdKxPre7F/x/2Zq6lARamJqCIVIdFJzNBQy/6cHRB7I5uN4DOCKHMuXlszaUamoRCUsrFtsElfird2icWXm/g1gHJzjx8rvDkmVTjUGqQuUAMzydRQl8w4ZbZEiJCJAJzgI+9pNtMC2zv6BSGJCJkpYJNNzBSvYg0lKeBiIsBWh1Cx3Vss0bn1EhnxEdeHLmmVORNiptXAAA
