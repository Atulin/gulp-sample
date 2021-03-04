new Vue({
    el: '#app',
    data: {
        csrf: null,
        rolesRoute: null,
        roles: [],
        userId: null,
    },
    methods: {
        manageBan: function () {
            this.$refs.manageBan.visible = true;
        },
        manageMute: function () {
            this.$refs.manageMute.visible = true;
        },
        saveRoles: function () {
            this.roles = [...document.querySelectorAll('input[type=checkbox]:checked')].map(e => Number(e.value));
            axios.post(`${this.rolesRoute}/roles`, {
                    UserId: this.userId,
                    Roles: this.roles
                },{
                    headers: { "RequestVerificationToken" : this.csrf }
                })
                .then(_ => location.reload())
                .catch(console.error);
        }
    },
    mounted() {
        this.csrf = document.querySelector('input[name=__RequestVerificationToken]').value;
        this.rolesRoute = document.getElementById('rolesRoute').dataset.route;
        this.userId = Number(document.getElementById('id').innerText);
    }
})