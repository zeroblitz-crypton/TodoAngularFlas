from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS  # Importa la extensión CORS

app = Flask(__name__)
CORS(app)
# Configura la conexión a la base de datos
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="todo"
)

cursor = db.cursor()

# Rutas del CRUD

# Obtener todas las tareas
@app.route('/api/todolist', methods=['GET'])
def get_todolist():
    cursor.execute('SELECT * FROM todolist')
    todolist = cursor.fetchall()
    return jsonify({'todolist': todolist})

# Obtener una tarea por ID
@app.route('/api/todolist/<int:task_id>', methods=['GET'])
def get_task(task_id):
    cursor.execute('SELECT * FROM todolist WHERE task_id = %s', (task_id,))
    task = cursor.fetchone()
    return jsonify({'task': task})

# Agregar una nueva tarea
@app.route('/api/todolist', methods=['POST'])
def add_task():
    data = request.json
    task_description = data['task_description']
    is_complete = data.get('is_complete', 0)
    cursor.execute('INSERT INTO todolist (task_description, is_complete) VALUES (%s, %s)', (task_description, is_complete))
    db.commit()
    return jsonify({'message': 'Task added successfully'})

# Actualizar una tarea
@app.route('/api/todolist/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.json
    task_description = data['task_description']
    is_complete = data['is_complete']
    cursor.execute('UPDATE todolist SET task_description = %s, is_complete = %s WHERE task_id = %s',
                   (task_description, is_complete, task_id))
    db.commit()
    return jsonify({'message': 'Task updated successfully'})

# Eliminar una tarea
@app.route('/api/todolist/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    cursor.execute('DELETE FROM todolist WHERE task_id = %s', (task_id,))
    db.commit()
    return jsonify({'message': 'Task deleted successfully'})

# Cambiar el estado de una tarea (is_complete)
@app.route('/api/todolist/change-status/<int:task_id>', methods=['PUT'])
def change_status(task_id):
    cursor.execute('UPDATE todolist SET is_complete = NOT is_complete WHERE task_id = %s', (task_id,))
    db.commit()
    return jsonify({'message': 'Task status changed successfully'})

# Obtener estadísticas de las tareas
@app.route('/api/todolist/stats', methods=['GET'])
def get_stats():
    cursor.execute('SELECT COUNT(*) FROM todolist')
    total_registros = cursor.fetchone()[0]

    cursor.execute('SELECT COUNT(*) FROM todolist WHERE is_complete = 1')
    registros_completos = cursor.fetchone()[0]

    registros_pendientes = total_registros - registros_completos

    return jsonify({
        'total_registros': total_registros,
        'registros_completos': registros_completos,
        'registros_pendientes': registros_pendientes
    })

if __name__ == '__main__':
    app.run(debug=True)
