'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok("Aplikasi REST API ku berjalan!", res)
};

//menampilkan semua data mahasiswa
exports.tampilsemuausers = function (req, res) {
    connection.query('SELECT * FROM users', function (error, rows, fileds) {
        if (error) {
            console.log(error);
        } else {
            response.ok(rows, res)
        }
    });
};

//menampilkan semua data mahasiwa berdasarkan id
exports.tampilberdasarkanid = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM users WHERE id = ?', [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res);
            }
        });
};

//menambahkan data mahasiswa
exports.tambahUsers = function (req, res) {
    var nim = req.body.nim;
    var name = req.body.name;
    var password = req.body.password;
    var status_user = req.body.status_user;
    var role = req.body.role;
    var status = req.body.status;

    connection.query('INSERT INTO users (nim,name,password,status_user,role,status) VALUES(?,?,?,?,?,?)',
        [nim, name, password, status_user, role, status],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Menambahkan Data!", res)
            }
        });
};


//mengubah data berdasarkan id
exports.ubahUsers = function (req, res) {
    var nim = req.body.nim;
    var name = req.body.name;
    var password = req.body.password;
    var status_user = req.body.status_user;
    var role = req.body.role;
    var status = req.body.status;

    connection.query('UPDATE users SET nim=?, name=?, password=?, status_user=?, role=?, status=?, WHERE id=?', [nim, name, password, status_user, role, status, id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Ubah Data", res)
            }
        });
}

//Menghapus data berdasarkan id
exports.hapusUsers = function (req, res) {
    var id = req.body.id;
    connection.query('DELETE FROM users WHERE id=?',[id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil Hapus Data", res)
            }
        });
}

// //menampilkan matakuliah group
// exports.tampilgroupmatakuliah = function(req, res){
//     connection.query('SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks from krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matakuliah = matakuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa',
//         function (error, rows, fields){
//             if(error){
//                 console.log(error);
//             }else {
//                 response.oknested(rows, res);
//             }
//         }
//     )

// }


