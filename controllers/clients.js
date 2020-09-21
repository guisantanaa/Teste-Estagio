const fs = require('fs')
const data = require("../data.json")

exports.index = function(req, res) {
    return res.render("clients/index", { clients: data.clients })
}

exports.create = function(req, res) {
    return res.render("clients/create")
}

exports.post = function (req, res) {
    
    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('please, fill all field')
        }
    }

    let { name, email, cpf, telephone, code, place, number, district, city } = req.body

    const id = Number(data.clients.length + 1)


    data.clients.push({
        id,
        name,
        email,
        cpf,
        telephone,
        code,
        place,
        number,
        district,
        city
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error")

        return res.redirect("/clients")
    })

    return res.send(req.body)

}

exports.show = function(req, res) {
    const { id } = req.params

    const foundClient = data.clients.find(function(client) {
        return client.id == id
    })

    if (!foundClient) return res.send("Client not found")

    return res.render("clients/show", { client: foundClient})
}

exports.edit = function (req, res) {

    const { id } = req.params

    const foundClient = data.clients.find(function (client) {
        return id == client.id
    })

    if (!foundClient) return res.send('Client not found')

    const client = {
        ...foundClient
    }

    return res.render('clients/edit', { client })
}

exports.put = function (req, res) {

    const { id } = req.body
    let = index = 0

    const foundClient = data.clients.find(function (client, foundIndex) {
        if (id == client.id) {
            index= foundIndex
            return true
        }
    })

    if (!foundClient) return res.send("Client not found")

    const client = {
        ...foundClient,
        ...req.body,
        id: Number(req.body.id)
    }

    data.clients[index] = client

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write error!")

        return res.redirect(`/clients/${id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body

    const filteredClients = data.clients.filter(function(client) {
        return client.id != id
    })

    data.clients = filteredClients

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send ("write file error")

        return res.redirect("/clients")
    })
}
