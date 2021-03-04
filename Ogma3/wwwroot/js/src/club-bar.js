new Vue({
    el: '#club-bar',
    data: {
        route: null,
        id: null,
        xcsrf: null,
        joined: null,
    },
    methods: {
        join: function () {
            axios.post(this.route,
                { ClubId: this.id }, 
                { headers: {"RequestVerificationToken": this.xcsrf} }
            )
            .then(res => {
                this.joined = res.data;
            })
            .catch(console.error)
        },
        report: function () {
            this.$refs.reportModal.visible = true;
        }
    },
    mounted() {        
        this.route = document.getElementById('data-route').dataset.route;
        this.id = Number(document.getElementById('data-id').dataset.id);
        this.joined = document.getElementById('data-joined').dataset.joined.toLowerCase() === 'true';
        this.xcsrf = document.querySelector('[name=__RequestVerificationToken]').value;
    },
    beforeCreate() {
        document.getElementById('join-btn').classList.remove('join', 'leave');
    }
})