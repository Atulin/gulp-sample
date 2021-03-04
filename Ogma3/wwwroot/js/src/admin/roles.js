let roles_vue = new Vue({
    el: "#app",
    data: {
        form: {
            name: null,
            color: null,
            order: null,
            isStaff: null,
            id: null
        },
        roles: [],
        route: null,
        xcsrf: null,
    },
    methods: {

        // Contrary to its name, it also modifies a role if needed.
        // It was simply easier to slap both functionalities into a single function.
        createRole: function (e) {
            e.preventDefault();
            if (this.form.name) {

                // If no ID has been set, that means it's a new role.
                // Thus, we POST it.
                if (this.form.id === null) {
                    axios.post(this.route,
                        {
                            name: this.form.name,
                            color: this.form.color,
                            isStaff: this.form.isStaff,
                            order: Number(this.form.order)
                        }, { headers: { RequestVerificationToken: this.xcsrf } })
                        .then(_ => this.getRoles())
                        .catch(console.error);

                    // If the ID is set, that means it's an existing role.
                    // Thus, we PUT it.
                } else {
                    axios.put(this.route + '/' + this.form.id,
                        {
                            id: this.form.id,
                            name: this.form.name,
                            color: this.form.color,
                            isStaff: this.form.isStaff,
                            order: Number(this.form.order)
                        }, { headers: { RequestVerificationToken: this.xcsrf } })
                        .then(_ => this.getRoles())
                        .catch(console.error)
                        // Clear the form too
                        .then(_ => this.cancelEdit());
                }

            }
        },

        // Gets all existing roles
        getRoles: function () {
            axios.get(this.route)
                .then(response => {
                    this.roles = response.data
                })
                .catch(console.error);
        },

        // Deletes a selected role
        deleteRole: function (t) {
            if(confirm("Delete permanently?")) {
                axios.delete(this.route + '/' + t.id, { headers: { RequestVerificationToken: this.xcsrf } })
                    .then(_ => this.getRoles())
                    .catch(console.error);
            }
        },

        // Throws a role from the list into the editor
        editRole: function (t) {
            this.form.name = t.name;
            this.form.color = t.color;
            this.form.id = t.id;
            this.form.order = t.order;
            this.form.isStaff = t.isStaff;
        },

        // Clears the editor
        cancelEdit: function () {
            this.form.name =
                this.form.color =
                    this.form.id = 
                        this.form.isStaff =
                            this.form.order = null;
        },
    }, 

    mounted() {
        // Grab the route from route helper
        this.route = document.getElementById('route').dataset.route;
        // Grab the XCSRF token
        this.xcsrf = document.querySelector('[name=__RequestVerificationToken]').value;
        // Grab the initial set of roles
        this.getRoles();
    }
});